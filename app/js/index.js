window.addEventListener("load", function() {
    //Parent class 1
    class Aircraft {
        #serialNumber;
        constructor(name, yearCertificated, weight) {
            this.#serialNumber = null;
            this.name = name;
            this.yearCertificated = yearCertificated;
            this.weight = weight;
        }
        fly() {
            console.log(`${this.name} believes he can fly і полетів!`)
        }
        isAbandoned () {
            if(this.yearCertificated < 1920) {
                console.log(`Літак ${this.name} напевно вже на пенсії`)
            } else {
                console.log(`${this.name} можливо літає до сьогодні`)
            }
        }
        getWeight() {
            console.log(`Вага літака ${this.name} = ${this.weight} тон`)
        }
        setSerial (number) {
            if(!number) {
                console.log('Введіть номер літака')
                return
            }
            this.#serialNumber = number;
            console.log(`Встановлено серійний номер ${this.#serialNumber}`)
        }
    }

    //Class 1.1
    class PistonAircraft extends Aircraft {
        #spinCount;
        constructor (name, yearCertificated, weight, screwDiameter, isTurbo, spinCount) {
            super(name, yearCertificated, weight);
            this.screwDiameter = screwDiameter;
            this.isTurbo = isTurbo;
            this.#spinCount = spinCount;
        }
        startEngine (isWind) {
            if(isWind) {
                console.log(`Може то вітер крутить його?`)
                return
            } 
            console.log('Двигун запущено')
        }
        setSpinSpeed(count) {
            if(count) {
                this.#spinCount = count
                console.log(`Встановлена швидкість обертів гвинта ${this.#spinCount} за хвилину`)
                return
            } 
            console.log(`Стандартна швидкість обертів гвинта ${this.#spinCount} за хвилину`)
        }
        getSpeed () {
            let speed = this.#spinCount / this.weight
            console.log(`Швидкість ${speed}`)
        }
    }
    const pistonAircraft = new PistonAircraft('Cirrus sr20', 1985, 1.5, 2, false, 200);
    console.log(pistonAircraft)
    // pistonAircraft.fly();
    // pistonAircraft.isAbandoned();
    // pistonAircraft.getWeight();
    // pistonAircraft.startEngine(false);
    // pistonAircraft.setSpinSpeed(250);
    // pistonAircraft.getSpeed();

    //Class 1.1.1
    class Helicopter extends PistonAircraft {
        #canHoldAltitude;
        constructor (name, yearCertificated, weight, screwDiameter, isTurbo, spinCount, rotorNumbers, isMedical, canHoldAltitude) {
            super(name, yearCertificated, weight, screwDiameter, isTurbo, spinCount);
            this.rotorNumbers = rotorNumbers;
            this.isMedical = isMedical;
            this.#canHoldAltitude = canHoldAltitude;
        }
        canHoldAltitude(altitude) {
            if (this.#canHoldAltitude >= altitude) {
                console.log(`${this.name} може піднятися на висоту ${altitude} метрів`);
            } else {
                console.log(`${this.name} не може піднятися на таку висоту`);
            }
        }
        isMedicalHelicopter() {
            if (this.isMedical) {
                console.log(`${this.name} є медичним гелікоптером`);
            } else {
                console.log(`${this.name} не є медичним гелікоптером`);
            }
        }
        determineType() {
            const rotorTypes = {
                1: 'однороторний',
                2: 'біроторний'
            };
    
            const type = rotorTypes[this.rotorNumbers] || 'невизначений тип';
            console.log(`${this.name} - ${type} гелікоптер`);
        }
    }
    const medHelicopter = new Helicopter('LifeFlight', 2015, 2.8, 3.5, false, 300, 2, true, 3000);
    console.log(medHelicopter)
    // medHelicopter.fly();
    // medHelicopter.isAbandoned();
    // medHelicopter.getWeight();
    // medHelicopter.canHoldAltitude(2500);
    // medHelicopter.isMedicalHelicopter();
    // medHelicopter.determineType();

    //Class 1.1.2
    class PistonPlane extends PistonAircraft {
        #pilotage;
        constructor (name, yearCertificated, weight, screwDiameter, isTurbo, spinCount, type, wingType, pilotage) {
            super(name, yearCertificated, weight, screwDiameter, isTurbo, spinCount);
            this.type = type;
            this.wingType = wingType;
            this.#pilotage = pilotage;
        }
        showTypeInfo() {
            console.log(`${this.name} - ${this.type} літак з ${this.wingType} крилами`);
        }
        isHighWing() {
            if (this.wingType === 'верхньоплан') {
                console.log(`${this.name} є верхньопланом`);
            } else {
                console.log(`${this.name} не є верхньопланом`);
            }
        }
        setPilotageCapability(hasPilotage) {
            if (hasPilotage === true || hasPilotage === 1) {
                this.#pilotage = true;
                console.log(`${this.name} може виконувати фігури пілотажу`);
            } else {
                this.#pilotage = false;
                console.log(`${this.name} не може виконувати фігури пілотажу`);
            }
        }
        
    }
    
    const pistonPlane = new PistonPlane('Cessna 172', 1995, 1.5, 2, false, 200, 'пасажирський', 'низькоплан', false);
    console.log(pistonPlane);
    // pistonPlane.setPilotageCapability(true);
    // pistonPlane.showTypeInfo();
    // pistonPlane.isHighWing();
    // pistonPlane.setSerial('UR-2133');

    //class 1.2
    class JetAircraft extends Aircraft {
        #engineSerialNumber;
        constructor (name, yearCertificated, weight, enginesNumber, apuPower, engineSerialNumber) {
            super(name, yearCertificated, weight);
            this.enginesNumber = enginesNumber;
            this.apuPower = apuPower;
            this.#engineSerialNumber = engineSerialNumber;
        }
        showEnginesInfo() {
            console.log(`${this.name} має ${this.enginesNumber} двигун(ів)`);
        }
        isPowerfulAircraft() {
            const totalPower = this.apuPower * this.enginesNumber;
            if (totalPower > 50000) {
                console.log(`${this.name} - дуже потужний літак`);
            } else {
                console.log(`${this.name} - не такий потужний`);
            }
        }
        setEngineSerialNumber(serialNumber) {
            if (!serialNumber) {
                console.log('Введіть номер двигуна');
                return;
            }
            this.#engineSerialNumber = serialNumber;
            console.log(`Встановлено серійний номер двигуна: ${this.#engineSerialNumber}`);
        }
    }

    const jetPlane = new JetAircraft('Boeing 747', 2010, 500, 4, 15000, 'JT7D-3');
    console.log(jetPlane)
    // jetPlane.showEnginesInfo();
    // jetPlane.isPowerfulAircraft();
    // jetPlane.setEngineSerialNumber('JT8D-2');

    //class 1.2.1
    class CombatJet extends JetAircraft {
        #weapons;
        constructor (name, yearCertificated, weight, enginesNumber, apuPower, engineSerialNumber, stealth, combatType, weapons) {
            super(name, yearCertificated, weight, enginesNumber, apuPower, engineSerialNumber);
            this.stealth = stealth;
            this.combatType = combatType;
            this.#weapons = weapons;
        }
        showCombatType() {
            console.log(`${this.name} - ${this.combatType} бойова машина`);
        }
        addWeapon(newWeapon) {
            this.#weapons.push(newWeapon);
            console.log(`${newWeapon} додано до арсеналу ${this.name}`);
        }
        listWeapons() {
            console.log(`Зброя в арсеналі ${this.name}: ${this.#weapons.join(', ')}`);
        }
    }
    const f35 = new CombatJet('F-35 Lightning II', 2016, 13.1, 1, 200, 'F135-PW-100', true, 'багатоцільовий', ['AIM-120 AMRAAM', 'AGM-158 JASSM', 'GBU-53/B StormBreaker']);
    console.log(f35)
    // f35.fly();
    // f35.isAbandoned();
    // f35.getWeight();
    // f35.showCombatType();
    // f35.addWeapon('AIM-9 Sidewinder');
    // f35.listWeapons();
    // f35.setSerial('OrkamPZD-12002')

    //class 1.2.2
    class CivilJet extends JetAircraft {
        #capacity;
        constructor (name, yearCertificated, weight, enginesNumber, apuPower, engineSerialNumber, isPersonal, isCargo, capacity) {
            super(name, yearCertificated, weight, enginesNumber, apuPower, engineSerialNumber);
            this.isPersonal = isPersonal;
            this.isCargo = isCargo;
            this.#capacity = capacity;
        }
        showCapacity() {
            console.log(`${this.name} має місткість ${this.#capacity} пасажирів`);
        }
        isPersonalJet() {
            if (this.isPersonal) {
                console.log(`${this.name} є приватним літаком`);
            } else {
                console.log(`${this.name} не є приватним літаком`);
            }
        }
        isCargoJet() {
            if (this.isCargo) {
                console.log(`${this.name} є вантажним літаком`);
            } else {
                console.log(`${this.name} не є вантажним літаком`);
            }
        }
    }

    const boeing737 = new CivilJet('Boeing 737', 1998, 41.5, 2, 500, 'CFM56-7B', false, false, 189);
    console.log(boeing737)
    // boeing737.fly();
    // boeing737.isAbandoned();
    // boeing737.getWeight();
    // boeing737.showCapacity();
    // boeing737.isPersonalJet();
    // boeing737.isCargoJet();
    
});
