import requests
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import firebase_admin
from firebase_admin import credentials, db
import time
import logging, os

print('Started order handler backend')
log_directory = 'D:\\website\\backend\\logs'
if not os.path.exists(log_directory):
    os.makedirs(log_directory)
# Configure logging
# Configure logging to save logs in the 'logs' folder
logging.basicConfig(filename=os.path.join(log_directory, 'order_processing.log'), 
                    level=logging.INFO, 
                    format='%(asctime)s - %(levelname)s - %(message)s')

# Firebase configuration
firebase_config = {
    "apiKey": "AIzaSyB-bQxxyN3bekbN17l80A7dyA9ycIP5VZc",
    "authDomain": "pcelarstvobojanicproject.firebaseapp.com",
    "databaseURL": "https://pcelarstvobojanicproject-default-rtdb.europe-west1.firebasedatabase.app",
    "projectId": "pcelarstvobojanicproject",
    "storageBucket": "pcelarstvobojanicproject.appspot.com",
    "messagingSenderId": "297939220343",
    "appId": "1:297939220343:web:6a1436eb101e1e49be5372"
}

# Function to read orders from Firebase
def read_orders():
    url = f"{firebase_config['databaseURL']}/orders.json"  # Pointing to the orders node
    response = requests.get(url)

    if response.status_code == 200:
        orders = response.json()  # Parse JSON response
        return orders
    else:
        print(f"Error: {response.status_code}, {response.text}")
        return None

def update_order_processed(order_id):
    # Reference to the specific order in Firebase
    url = f"{firebase_config['databaseURL']}/orders/{order_id}.json"
    response = requests.patch(url, json={'orderProcessed': True})  # Update the orderProcessed field to True

    if response.status_code == 200:
        print(f"Order {order_id} has been updated to processed.")
    else:
        print(f"Error updating order {order_id}: {response.status_code}, {response.text}")


def send_email(to_email, subject, body):
    # Email configuration
    from_email = 'pgbojanic@gmail.com'
    from_password = 'fyjm uopb rvsj epoy'  # Your Gmail password or App Password if 2FA is enabled

    # Create message
    msg = MIMEMultipart()
    msg['From'] = from_email
    msg['To'] = to_email
    msg['Subject'] = subject

    # Attach the email body
    msg.attach(MIMEText(body, 'html'))  # Change 'plain' to 'html' for HTML content

    try:
        # Connect to the Gmail SMTP server
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()  # Upgrade to secure connection
            server.login(from_email, from_password)  # Log in to your account
            server.send_message(msg)  # Send the email
            print("Email sent successfully!")

    except Exception as e:
        print(f"Failed to send email: {e}")

def sendEmailToCustomer(order_data):
    recipient_email = order_data['email']
    email_subject = "Porudzbina - pčelarstvo bojanić"
    email_body = f"""
    <html>
    <body>
        <h2>Nova narudžbina</h2>
        <p><strong>Ime:</strong> {order_data['ime']}</p>
        <p><strong>Prezime:</strong> {order_data['prezime']}</p>
        <p><strong>Grad:</strong> {order_data['grad']}</p>
        <p><strong>Adresa:</strong> {order_data['adresa']}</p>
        <p><strong>Poštanski broj:</strong> {order_data['postNumber']}</p>
        <p><strong>Email:</strong> {order_data['email']}</p>
        <p><strong>Datum:</strong> {order_data['date']}</p>
        <p><strong>Napomena:</strong> {order_data['napomena']}</p>
        <p><strong>Ukupna cena:</strong> {order_data['totalPrice']} RSD</p>
        <h3>Sadržaj narudžbine:</h3>
        <ul>
    """

    # Add order items to the email body
    for item in order_data['orderContent']:
        email_body += f"""
            <li>
                <strong>Naziv:</strong> {item['name']}<br>
                <strong>Količina:</strong> {item['quantity']}<br>
                <strong>Tip:</strong> {item['type']}<br>
                <strong>Težina:</strong> {item['weight']}
            </li>
        """

    email_body += """
        </ul>
        <h3>Nakon obrade podudžbine dobićete obaveštenje na ovu email adresu.</h3>
    </body>
    </html>
    """

    # Print the email body (for demonstration)
    try:
        # Print the email body (for demonstration)
        send_email(recipient_email, email_subject, email_body)
        logging.info(f"Email sent to {recipient_email} for order from {order_data['ime']}.")
    except Exception as e:
        logging.error(f"Failed to send email to {recipient_email} for order from {order_data['ime']}: {e}")


def sendEmailToMe(order_data):
    recipient_email = 'pgbojanic@gmail.com'
    email_subject = "Nova porudzbina od " + order_data['ime']
    email_body = f"""
    <html>
    <body>
        <h2>Nova narudžbina</h2>
        <p><strong>Ime:</strong> {order_data['ime']}</p>
        <p><strong>Prezime:</strong> {order_data['prezime']}</p>
        <p><strong>Grad:</strong> {order_data['grad']}</p>
        <p><strong>Adresa:</strong> {order_data['adresa']}</p>
        <p><strong>Poštanski broj:</strong> {order_data['postNumber']}</p>
        <p><strong>Email:</strong> {order_data['email']}</p>
        <p><strong>Datum:</strong> {order_data['date']}</p>
        <p><strong>Napomena:</strong> {order_data['napomena']}</p>
        <p><strong>Ukupna cena:</strong> {order_data['totalPrice']} RSD</p>
        <h3>Sadržaj narudžbine:</h3>
        <ul>
    """

    # Add order items to the email body
    for item in order_data['orderContent']:
        email_body += f"""
            <li>
                <strong>Naziv:</strong> {item['name']}<br>
                <strong>Količina:</strong> {item['quantity']}<br>
                <strong>Tip:</strong> {item['type']}<br>
                <strong>Težina:</strong> {item['weight']}
            </li>
        """

    email_body += f"""
        </ul>
    </body>
    </html>
    """

    # Print the email body (for demonstration)
    try:
        # Print the email body (for demonstration)
        send_email(recipient_email, email_subject, email_body)
        logging.info(f"Email sent to {recipient_email} for order from {order_data['ime']}.")
    except Exception as e:
        logging.error(f"Failed to send email to {recipient_email} for order from {order_data['ime']}: {e}")
    pass
# Example usage
if __name__ == "__main__":
    while True:
        orders = read_orders()
        if orders:
            for order_id, order_data in orders.items():
                if(order_data['orderProcessed'] == False):
                    sendEmailToCustomer(order_data)
                    sendEmailToMe(order_data)
                    update_order_processed(order_id)
                else:
                    # print(f'order {order_id} already processed ')
                    pass
        else:
            # print("No orders found.")
            pass
        time.sleep(300)