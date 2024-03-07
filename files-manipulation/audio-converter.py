# install ffmpeg: sudo apt-get install ffmpeg
# or on mac brew install ffmpeg

from pydub import AudioSegment

downloads_folder = "/Users/dan/Downloads/"
audio = "1db82afa-95f7-4c65-bd70-5c04c1225d11.aac"
converted_audio = "converted_" + audio.split('.')[0] + ".mp3"

try:
    song = AudioSegment.from_file(downloads_folder + audio)
    song.export(downloads_folder + converted_audio, format="mp3")
except Exception as e:
    print(e)
    print("Error converting audio file")
    print("Please check the file name and try again")
    print("If the problem persists, please contact the developer")
