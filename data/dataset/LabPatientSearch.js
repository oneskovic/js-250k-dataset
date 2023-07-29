Ext.define('Laboratory.model.LabPatientSearch', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'PatientUuid',
        type: 'string',
        mapping: 'uuid'
    },{
    	name: 'PatientName',
    	type: 'string',
    	mapping: 'person.display'
   },{
        name: 'FirstName',
        type: 'string',
        mapping: 'person.preferredName.givenName'
    },{
        name: 'LastName',
        type: 'string',
        mapping: 'person.preferredName.familyName'
    },{
        name: 'Sex',
        type: 'string',
        mapping: 'person.gender'
    },{
        name: 'DOB',
        type: 'string',
        mapping: 'person.birthdate'
    },
// Patients created from Registration Module dont have following attributes    
/*    {
        name: 'RelativeName',
        type: 'string',
        persist: false
    },{
        name: 'Village',
        type: 'string',
        mapping: 'preferredAddress.cityVillage', 
        persist: false
    },{
        name: 'Panchayat',
        type: 'string',
        persist : false
    },{
        name: 'Town',
        type: 'string',
        mapping: 'preferredAddress.stateProvince',
        persist: false
    }*/],

});
