radio.set_group(7)
ANGLE_OUVERT = 90
ANGLE_GRIP = 104
PAS_ANGLE = 1
angle_servo = ANGLE_OUVERT
def angle_vers_pourcentage(angle: number):
    p = (angle - ANGLE_OUVERT) * 100 / (ANGLE_GRIP - ANGLE_OUVERT)

    p = Math.max(0, Math.min(100, p))

    return p


def afficher_jauge(angle: number):
    pourcentage = angle_vers_pourcentage(angle)

    led.plot_bar_graph(pourcentage, 100)


def envoyer_angle():
    radio.send_value("A", angle_servo)

    afficher_jauge(angle_servo)


def on_forever():
    global angle_servo

    if input.button_is_pressed(Button.A):
        angle_servo = Math.max(
            ANGLE_OUVERT,
            angle_servo - PAS_ANGLE
        )

        envoyer_angle()

        basic.pause(20)

    elif input.button_is_pressed(Button.B):
        angle_servo = Math.min(
            ANGLE_GRIP,
            angle_servo + PAS_ANGLE
        )

        envoyer_angle()

        basic.pause(20)


basic.forever(on_forever)