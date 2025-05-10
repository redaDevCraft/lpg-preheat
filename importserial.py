import serial
import requests
import json
import time  # Add this line

SERIAL_PORT = 'COM11'  # Update this if different
BAUD_RATE = 9600
API_URL = 'http://127.0.0.1:8000/api/sensor-data'  # Your Laravel endpoint

def read_serial_data():
    try:
        ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)
        print(f"[INFO] Connected to {SERIAL_PORT}")
    except Exception as e:
        print(f"[ERROR] Could not open serial port: {e}")
        return

    while True:
        try:
            line = ser.readline().decode('utf-8').strip()
            if not line:
                time.sleep(1)  # Give it a second before retrying
                continue

            print(f"[SERIAL RAW] {line}")

            try:
                data = json.loads(line)
                print(f"[PARSED JSON] {data}")
                send_to_laravel(data)
            except json.JSONDecodeError:
                print(f"[ERROR] Invalid JSON: {line}")

        except Exception as e:
            print(f"[ERROR] Failed to read from serial: {e}")

        time.sleep(1)  # Add a pause between iterations

def send_to_laravel(data):
    try:
        response = requests.post(API_URL, json=data)
        if response.status_code == 201:
            print(f"[✅ SENT] {data}")
        else:
            print(f"[❌ Laravel Error] {response.status_code} - {response.text}")
    except requests.exceptions.RequestException as e:
        print(f"[ERROR] Could not send data to Laravel: {e}")

if __name__ == '__main__':
    read_serial_data()
