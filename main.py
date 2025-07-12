import json
import time
from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.label import Label
from kivy.uix.button import Button
from kivy.uix.textinput import TextInput

collection = []

def get_current_time():
    t = time.localtime()
    return time.strftime("%H:%M:%S", t)

def check_f_json():
    global collection
    try:
        with open("to.json", "r") as f:
            collection = json.load(f)
        return collection
    except FileNotFoundError:
        with open("to.json", "w") as file:
            file.write("[]")

def add_t_collection(new_item):
    collection.append(new_item)
    with open("to.json", "w") as f:
        json.dump(collection, f, indent=4)

def show_t_collection_as_text():
    text = ""
    for item in collection:
        text += f"Title: {item['Title']}, Time Added: {item['time_added']}\n"
    return text

class MyApp(App):
    def build(self):
        self.layout = BoxLayout(orientation='vertical', spacing=10, padding=10)

        self.input = TextInput(hint_text="Typ de gametitel hier", multiline=False)
        self.button = Button(text="Toevoegen aan collectie")
        self.label = Label(text="Collectie wordt hier getoond")

        self.button.bind(on_press=self.add_game)

        self.layout.add_widget(self.input)
        self.layout.add_widget(self.button)
        self.layout.add_widget(self.label)

        return self.layout

    def on_start(self):
        check_f_json()
        self.label.text = show_t_collection_as_text()

    def add_game(self, instance):
        title = self.input.text.strip()
        if title:
            item = {"Title": title, "time_added": get_current_time()}
            add_t_collection(item)
            self.label.text = show_t_collection_as_text()
            self.input.text = ""

if __name__ == "__main__":
    MyApp().run()
