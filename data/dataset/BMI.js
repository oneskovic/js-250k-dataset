Ext.define('Registration.controller.BMI', {
    extend: 'Ext.app.Controller',
    views: ['Viewport', 'Home', 'RegistrationPart1', 'RegistrationConfirm', 'RegistrationBMI',
    'SearchPart1', 'SearchPart2', 'SearchConfirm'],
    controllers: ['BMI'],
    init: function () {
        //On init, check for change of numberfields in the field container heightWeightID in the view registrationbmi
        this.control({
            'registrationbmi #heightWeightID numberfield': {
                change: {
                    fn: this.getBMIData,
                    buffer: 100
                }
            }

        });
    },

    //Get values from view registrationbmi and call neccessary methods to calculate bmi & display on screen
    getBMIData: function () {
        var height_cm = parseFloat(Ext.getCmp('heightIDcm').getValue()); //Get height value from view registrationbmi
        var weight_kg = parseFloat(Ext.getCmp('weightIDkg').getValue()); //Get weight value from view registrationbmi
        var bmiInfo = this.calculateBMI(height_cm, weight_kg); //Calculate bmi
        this.updateBMIDisplay(bmiInfo.status, bmiInfo.bmi); //Update the value displayed
    },

    //Function to Calculate bmi 
    calculateBMI: function (height_cm, weight_kg) {
        var bmiErrorHeight = 0; //Variable to check for height error
        var bmiErrorWeight = 0; //Varibale to check for weight error
        if (height_cm <= BMI_HEIGHT_MIN || height_cm > BMI_HEIGHT_MAX) {
            //If only weight is illegal
            status = 'Illegal Value of Height!';
            bmiErrorHeight = 1;
        }
        if (weight_kg <= BMI_WEIGHT_MIN || weight_kg > BMI_WEIGHT_MAX) {
            bmiErrorWeight = 1;
            if (bmiErrorHeight == 1) {
                //If both height and weight are illegal
                status = 'Illegal Value of Height and Weight!';
            } else {
                //If only weight is illegal
                status = 'Illegal Value of Weight!';
            }
        }
        if (bmiErrorHeight == 1 || bmiErrorWeight == 1) {
            //If either height or weight or both are illegal
            bmi = 'Illegal';
            return {
                status: status,
                bmi: bmi
            };
        } else {
            var height_m = height_cm / 100; //Convert cm to m
            var bmi = (weight_kg) / (height_m * height_m); //bmi Calculation
            var status = '';

            //Below are if checks for range of bmi calculated
            if (bmi < WHO_BMI_VSUNDERWEIGHT) {
                status = 'Very Severely Underweight';
            }
            if (bmi >= WHO_BMI_VSUNDERWEIGHT && bmi < WHO_BMI_SUNDERWEIGHT) {
                status = 'Severely Underweight';
            }
            if (bmi >= WHO_BMI_SUNDERWEIGHT && bmi < WHO_BMI_UNDERWEIGHT) {
                status = 'Underweight';
            }
            if (bmi >= WHO_BMI_UNDERWEIGHT && bmi < WHO_BMI_NORMAL) {
                status = 'Normal';
            }
            if (bmi >= WHO_BMI_NORMAL && bmi < WHO_BMI_OVERWEIGHT) {
                status = 'Overweight';
            }
            if (bmi >= WHO_BMI_OVERWEIGHT && bmi < WHO_BMI_OBESE) {
                status = 'Obese';
            }
            if (bmi >= WHO_BMI_OBESE && bmi < WHO_BMI_SOBESE) {
                status = 'Severely Obese';
            }
            if (bmi >= WHO_BMI_SOBESE) {
                status = 'Very Severely Obese';
            }
            return {
                status: status,
                bmi: bmi
            };
        }
    },

    //Updates the bmi status message and also updates the bmi value displayed in the numberfield and slider
    updateBMIDisplay: function (bmiStatusText, bmi) {
        Ext.getCmp('bmiStatusID').setValue(bmiStatusText); //update bmi status
        Ext.getCmp('bmiNumberfieldID').setValue(bmi); //update bmi numberfield
    }
});
