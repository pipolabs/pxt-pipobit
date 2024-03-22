enum TemperatureUnits {
    celsius = 0,
    fahrenheit = 1,
    kelvin = 2,
}

enum TrafficLightColors {
    //% block
    //% block.loc.es-ES="rojo"
    red = 0,
    //% block
    //% block.loc.es-ES="ambar"
    yellow = 1,
    //% block
    //% block.loc.es-ES="verde"
    green = 2,
}

enum States {
    //% block
    //% block.loc.es-ES="apagado"
    off = 0,
    //% block
    //% block.loc.es-ES="encendido"
    on = 1,
}

//% color="#E24D33" icon="\uf0e7" weight=100 block="Pipo:bit"
namespace pipobit {

    let trafficLightPins = [
        DigitalPin.P0,
        DigitalPin.P1,
        DigitalPin.P2,
    ];

    //% block="Set $color traffic light on pin $p"
    //% block.loc.es-ES="Establecer semáforo $color en pin $p"
    //% group="Traffic light"
    //% weight=20
    //% color.fieldEditor="gridpicker" color.fieldOptions.width=220 color.fieldOptions.columns=3
    //% p.fieldEditor="gridpicker" p.fieldOptions.width=220 p.fieldOptions.columns=3
    export function setTrafficLightPin(color: TrafficLightColors, p: DigitalPin) {
        trafficLightPins[color] = p;
    }

    //% block="Set $color traffic light to $state"
    //% block.loc.es-ES="Establecer semáforo $color a $state"
    //% group="Traffic light"
    //% weight=10
    //% color.fieldEditor="gridpicker" color.fieldOptions.width=220 color.fieldOptions.columns=3
    export function setTrafficLightState(color: TrafficLightColors, state: States) {
        pins.digitalWritePin(trafficLightPins[color], state);
    }

    //% block="Read temperature from pin $p || in $unit"
    //% block.loc.es-ES="Leer temperatura en pin $p || en $unit"
    //% group="Environment sensor"
    //% unit.defl=TemperatureUnits.celsius unit.fieldEditor="gridpicker" unit.fieldOptions.width=220 unit.fieldOptions.columns=3
    //% p.fieldEditor="gridpicker" p.fieldOptions.width=220 p.fieldOptions.columns=3
    export function readTemperature(p: AnalogPin, unit: TemperatureUnits = TemperatureUnits.celsius): number {
        let kelvin = Math.map(pins.analogReadPin(p), 0, 1023, 0, 3.3) / 0.01;
        if (unit == TemperatureUnits.celsius) {
            return kelvin - 273.15;
        } else if (unit == TemperatureUnits.fahrenheit) {
            return (kelvin - 273.15) * 9 / 5 + 32;
        }
        return kelvin;
    }

    //% block="Read light from pin $p"
    //% block.loc.es-ES="Leer luz en pin $p"
    //% group="Environment sensor"
    //% p.fieldEditor="gridpicker" p.fieldOptions.width=220 p.fieldOptions.columns=3
    export function readLight(p: AnalogPin): number {
        let level = Math.map(pins.analogReadPin(p), 10, 1000, 0, 100);
        return Math.constrain(level, 0, 100);
    }

}