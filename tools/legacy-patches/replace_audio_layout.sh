cat << 'INNEREOF' > temp_audio_layout.tsx
          {/* Audio Player Controls */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-3.5 shadow-md flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <span className="min-w-10 text-xs font-mono font-bold text-slate-300">
                {formatAudioTime(currentTime)}
              </span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-lime-400 via-cyan-400 to-sky-400 transition-all duration-300"
                  style={{
                    width: `${duration ? Math.min((currentTime / duration) * 100, 100) : 0}%`,
                  }}
                />
              </div>
              <span className="min-w-10 text-right text-xs font-mono font-bold text-slate-300">
                {formatAudioTime(duration)}
              </span>
            </div>
            
            <VoiceSpectrum
              isPlaying={isPlaying}
              currentTime={currentTime}
              spectrum={useTTS && isPlaying ? Array.from({length: 48}, () => Math.random() * 100) : spectrum}
            />
            
            <div className="flex items-center justify-center gap-4 mt-2">
              <AudioControlButton onClick={playAudio} disabled={isPlaying}>
                ▶
              </AudioControlButton>
              <AudioControlButton onClick={pauseAudio} disabled={!isPlaying}>
                ⏸
              </AudioControlButton>
              <AudioControlButton onClick={replayAudio}>
                ↻
              </AudioControlButton>
              <AudioControlButton onClick={stopAudio}>
                ■
              </AudioControlButton>
            </div>
          </div>
INNEREOF
sed -i '998,1039c\
//REPLACED_AUDIO_LAYOUT\
' src/features/activities/activityShared.tsx
sed -i '/\/\/REPLACED_AUDIO_LAYOUT/r temp_audio_layout.tsx' src/features/activities/activityShared.tsx
sed -i '/\/\/REPLACED_AUDIO_LAYOUT/d' src/features/activities/activityShared.tsx
rm temp_audio_layout.tsx
