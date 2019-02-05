#!/usr/bin/env python3

import requests
import json
from secrets import * 

HTTP_REQUESTS = {
    "get": requests.get,
    "post": requests.post
}

   
def hit_server(base_url, http_type, endpoint="", params={}):
    # Hits the server with a http requests 
    # Gets the http handler 
    http_handler = HTTP_REQUESTS[http_type]
    # Generates the url to hit with the requests
    url  = base_url + endpoint
    # Sends request to the url with params
    resp = http_handler(url, params)
    return resp.json()

class GroupMeBot(object):
    def __init__(self, groupme_url="https://api.groupme.com/v3/bots/post"):
        self.url = groupme_url
        self.bot_id = GROUPME_BOT_ID
        self.message_template = {"bot_id": self.bot_id, "text": ""}

    def send_msg(self, msg="Hello!"):
        payload = self.message_template.copy()
        payload["text"] = msg
        resp = hit_server(self.url, "post", params=payload)
        print(resp)
        
if __name__ == "__main__":
    # bot = ChatBot("http://127.0.0.1:3000")
    # print(bot.hit_server("get"))
    gmbot = GroupMeBot()
    gmbot.send_msg()
