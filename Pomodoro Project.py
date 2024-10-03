import tkinter as tk

window = tk.Tk()

window.geometry("800x500")
window.title("My First Pomodoro Timer")

label = tk.Label(window, text="", font=("arial", 18))
label.pack()

window.mainloop()