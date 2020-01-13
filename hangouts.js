/**
 * @author Kenneth Koepcke
 */

const fs = require('fs');


const names = ['Kenneth Koepcke']; //The nick names
const maximum_participants = 7; //i.e. a single conversation thread will have 2 people
const hangouts_file = "data/Hangouts.json"
const fileout = "out/test.txt";

let data = fs.readFileSync(hangouts_file);
let json = JSON.parse(data);


let writeStream = fs.createWriteStream(fileout);

let fo = new console.Console(writeStream, writeStream);


let id_map = {};

for(let message_i = 0; message_i < json.conversations.length; message_i ++){
    let message = json.conversations[message_i];
    //console.log(message);
    //console.log(message.conversation.conversation.current_participant);
    //console.log(name(message));

    //The events for each message
    let events = message.events;
    //The conversation details for each message
    let conversation = message.conversation;

    //The participant class
    let participants = conversation.conversation.current_participant; //array
    
    //The hangouts data on the participant. Contains name.
    let participant_data = conversation.conversation.participant_data; //array
    
    //console.log(participants);
    //console.log(participant_data);
    /**
     * 
     * @param {hangouts message} mes 
     * @param {string} name
     * @returns true iff convo contains name 
     */
    let message_contains = (mes, name) => {
        let c = mes.conversation.conversation.participant_data;
        let contains = false;
        for(let participant_i = 0; participant_i < c.length; participant_i ++){
            if(id_map[c[participant_i].id.chat_id] == undefined){
                id_map[c[participant_i].id.chat_id] = c[participant_i].fallback_name;
            }
            if(c[participant_i].fallback_name == name){
                contains = true;
            }
        }
        return contains;
    }
    //console.log(message_contains(message, 'NAME'));
    let contains_all = true;
    for(let contains_check_i = 0; contains_check_i < names.length && contains_all; contains_check_i ++){
        if(!message_contains(message, names[contains_check_i])){
            contains_all = false
        }
    }
    if(contains_all && participant_data.length < maximum_participants){
        for(let event_i = 0; event_i < events.length; event_i ++){
            let event = events[event_i];
            //console.log(event);
            if(event.event_type == 'REGULAR_CHAT_MESSAGE'){
                let segment = (ev) => ev.chat_message.message_content.segment;
                if(segment(event) != undefined){
                    let segment_array = segment(event);
                    for(let segment_i = 0; segment_i < segment_array.length; segment_i ++){
                        //console.log(segment_array);
                        //console.log(id_map[event.sender_id.chat_id] + ": " + segment_array[segment_i].text);
                        let name_message = id_map[event.sender_id.chat_id] + ": " + segment_array[segment_i].text;
                        //console.log(name_message);
                        fo.log(name_message);
                        // if(id_map[event.sender_id.chat_id] == names[0]){
                        //     fo.log(segment_array[segment_i].text);
                        // }
                    }
                } 
            }
        }
    }
}
