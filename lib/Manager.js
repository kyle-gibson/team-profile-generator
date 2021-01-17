const Employee = require('./Employee');

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officerNumber;
    };

    getRole(){
        return "Manager";
    };

    getOfficeNumber() {
        return this.officeNumber;
    };
};

module.exports = Manager;