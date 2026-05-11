function angle_vers_pourcentage (angle: number) {
    p = (angle - ANGLE_OUVERT) * 100 / (ANGLE_GRIP - ANGLE_OUVERT)
    p = Math.max(0, Math.min(100, p))
    return p
}
function envoyer_angle () {
    radio.sendValue("A", angle_servo)
    afficher_jauge(angle_servo)
}
function afficher_jauge (angle: number) {
    pourcentage = angle_vers_pourcentage(angle)
    led.plotBarGraph(
    pourcentage,
    100
    )
}
let pourcentage = 0
let p = 0
let angle_servo = 0
let ANGLE_GRIP = 0
let ANGLE_OUVERT = 0
radio.setGroup(90)
ANGLE_OUVERT = 90
ANGLE_GRIP = 104
let PAS_ANGLE = 1
angle_servo = ANGLE_OUVERT
basic.forever(function () {
    if (input.buttonIsPressed(Button.A)) {
        angle_servo = Math.max(ANGLE_OUVERT, angle_servo - PAS_ANGLE)
        envoyer_angle()
        basic.pause(20)
    } else if (input.buttonIsPressed(Button.B)) {
        angle_servo = Math.min(ANGLE_GRIP, angle_servo + PAS_ANGLE)
        envoyer_angle()
        basic.pause(20)
    }
})
