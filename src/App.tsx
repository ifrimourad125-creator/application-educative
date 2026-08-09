import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import AndroidContainer from './components/AndroidContainer';
import PageLoader from './components/PageLoader';
import StartupScreen from './components/StartupScreen';
import { playSound, primeSounds } from './utils/sound';
import { AudioUIProvider } from './hooks/useAudioUI';
import type { LevelId, SemesterId } from './types/app';

const HomePage = lazy(() => import('./pages/HomePage'));
const LevelPage = lazy(() => import('./pages/LevelPage'));
const ActivitiesPage = lazy(() => import('./pages/ActivitiesPage'));
const ActivityDetailPage = lazy(() => import('./pages/ActivityDetailPage'));
const AudioHubPage = lazy(() => import('./pages/AudioHubPage'));
const ProgressPage = lazy(() => import('./pages/ProgressPage'));
const ProgrammePage = lazy(() => import('./pages/ProgrammePage'));
const ExamsPage = lazy(() => import('./pages/ExamsPage'));

import { findLevel, findSelectedUnit, findActivity } from './selectors/catalogSelectors';

function HomeRoute() {
  const navigate = useNavigate();
  return <HomePage onSelectLevel={(level) => navigate(`/niveau/${level.id}`)} />;
}

function LevelRoute() {
  const navigate = useNavigate();
  const { levelId } = useParams();
  const level = findLevel(levelId);
  if (!level) return <Navigate to="/" replace />;
  return (
    <LevelPage
      level={level}
      onSelectUnit={(unit) =>
        navigate(`/niveau/${level.id}/semestre/${unit.semesterId}/unite/${unit.id}`)
      }
      onBack={() => navigate('/')}
    />
  );
}

function ActivitiesRoute() {
  const navigate = useNavigate();
  const { levelId, semesterId, unitId } = useParams();
  const selectedUnit = findSelectedUnit(levelId, semesterId, unitId);
  if (!selectedUnit) return <Navigate to={levelId ? `/niveau/${levelId}` : '/'} replace />;
  return (
    <ActivitiesPage
      unitTitle={selectedUnit.title}
      selectedUnit={selectedUnit}
      onSelectActivity={(activity) =>
        navigate(
          `/niveau/${selectedUnit.levelId}/semestre/${selectedUnit.semesterId}/unite/${selectedUnit.id}/activite/${activity.id}`
        )
      }
      onBack={() => navigate(`/niveau/${selectedUnit.levelId}`)}
    />
  );
}

function ActivityRoute() {
  const navigate = useNavigate();
  const { levelId, semesterId, unitId, activityId } = useParams();
  const selectedUnit = findSelectedUnit(levelId, semesterId, unitId);
  const activity = findActivity(activityId);
  if (!selectedUnit || !activity) {
    return <Navigate to={levelId ? `/niveau/${levelId}` : '/'} replace />;
  }
  const activitiesUrl = `/niveau/${selectedUnit.levelId}/semestre/${selectedUnit.semesterId}/unite/${selectedUnit.id}`;
  return (
    <ActivityDetailPage
      activity={activity}
      selectedUnit={selectedUnit}
      onBack={() => navigate(activitiesUrl)}
      onBackToLevel={() => navigate(`/niveau/${selectedUnit.levelId}`)}
    />
  );
}

function shouldSkipStartup() {
  if (typeof window === 'undefined') return false;
  return (
    window.localStorage.getItem('skipStartup') === 'true' ||
    window.location.search.includes('skipStartup=1')
  );
}

export default function App() {
  const [isStarting, setIsStarting] = useState(() => !shouldSkipStartup());

  useEffect(() => {
    if (!isStarting) return;
    const unlockSounds = () => primeSounds();
    window.addEventListener('pointerdown', unlockSounds, { once: true });
    const timer = window.setTimeout(() => {
      setIsStarting(false);
      playSound('startup');
    }, 1500);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('pointerdown', unlockSounds);
    };
  }, [isStarting]);

  if (isStarting) return <StartupScreen />;

  return (
    <AudioUIProvider>
      <AndroidContainer>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomeRoute />} />
            <Route path="/niveau/:levelId" element={<LevelRoute />} />
            <Route
              path="/niveau/:levelId/semestre/:semesterId/unite/:unitId"
              element={<ActivitiesRoute />}
            />
            <Route
              path="/niveau/:levelId/semestre/:semesterId/unite/:unitId/activite/:activityId"
              element={<ActivityRoute />}
            />
            <Route path="/audio-hub" element={<AudioHubPage />} />
            <Route path="/progression" element={<ProgressPage />} />
            <Route path="/programme" element={<ProgrammePage />} />
            <Route path="/controles" element={<ExamsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AndroidContainer>
    </AudioUIProvider>
  );
}
