# Hangouts-Scraping

Takes in a valid Hangouts.json (obtained from google takeout) and writes all the messages from conversation
  threads that contain the people specified. If you put in your own name you'll get (big surprise) every message from every chat you've been in, since you have to have been in a chat for it to be archived.
  
  arguments (modified in the first few lines of hangouts.js):
    hangouts_file: the file and directory of the Hangouts.json (example: data/Hangouts.json)
    fileout: the file and directory of the output file (example: out/test.txt)
    names: an array of nick names to filter conversations by
    maximum_participants: the maximum number of participants in a conversation thread. Used to filter out large groups.
    
    
outputs to a file a text history with the nick name of a message sender followed by the message (example: Kenneth Koepcke: Yo)
    
