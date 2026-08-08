cat << 'INNEREOF' > temp_icons.tsx
            <div className="flex items-center justify-center gap-4 mt-2">
              <AudioControlButton onClick={playAudio} disabled={isPlaying}>
                <Play className="w-5 h-5 ml-1" />
              </AudioControlButton>
              <AudioControlButton onClick={pauseAudio} disabled={!isPlaying}>
                <Pause className="w-5 h-5" />
              </AudioControlButton>
              <AudioControlButton onClick={replayAudio}>
                <RotateCcw className="w-5 h-5" />
              </AudioControlButton>
              <AudioControlButton onClick={stopAudio}>
                <Square className="w-5 h-5 fill-current" />
              </AudioControlButton>
            </div>
INNEREOF
sed -i '1023,1036c\
//REPLACED_ICONS\
' src/features/activities/activityShared.tsx
sed -i '/\/\/REPLACED_ICONS/r temp_icons.tsx' src/features/activities/activityShared.tsx
sed -i '/\/\/REPLACED_ICONS/d' src/features/activities/activityShared.tsx
rm temp_icons.tsx
