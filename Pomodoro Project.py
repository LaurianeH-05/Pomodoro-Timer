import tkinter as tk

window = tk.Tk()
window.geometry("800x500")
window.title("My First Pomodoro Timer")

label = tk.Label(window, text="Pomodoro Timer", font=("arial", 24))
label.pack(pady=20)

time_display = tk.Label(window, text="25:00", font=("arial", 48))
time_display.pack(pady=20)

is_running = False
time_left = 25 * 60

def update_timer():
    global time_left
    if time_left > 0:
        mins, secs = divmod(time_left, 60)
        time_display.config(text=f"{mins:02}:{secs:02}")
        time_left -= 1
        window.after(1000, update_timer)
    else:
        time_display.config(text="Time's Up!")

def start_timer():
    global is_running
    if not is_running:
        is_running = True
        update_timer()

start_button = tk.Button(window, text="Start", command=start_timer, font=("arial", 16))
start_button.pack(pady=10)

window.mainloop()
