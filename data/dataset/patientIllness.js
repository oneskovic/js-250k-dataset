//Model for mapping patients with  illnesses
Ext.define('chw.model.patientIllness', {
    extend: 'Ext.data.Model',
    config: {
        identifier: 'uuid',
        fields: [{
            name: 'patientId',
            type: 'int'
        }, {
            name: 'patientDetails',
            model: 'chw.model.patient'
        }, {
            name: 'illnessDetails',
            model: 'chw.model.illness'
        }, {
           name: 'illnessId',
           type: 'int'
        }, {
            name: 'illnessStartDate',
            type: 'date'
            // dateFormat: 'g:i a'
        }, {
            name: 'illnessEndDate',
            type: 'date'
            // dateFormat: 'g:i a'
        }, {
            name: 'illnessTreatment',
            type: 'string'
        }, {
            name: 'illnessNotes',
            type: 'string'
        }/*, {
            name: 'illnessIncident',
            type: 'int'
        }*//*, {
            name: 'illnessActive',
            type: 'bool'
        }*/]
    }
})