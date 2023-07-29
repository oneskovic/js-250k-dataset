Ext.define('Ssp.controller.tool.studentintake.EducationGoalsViewController', {
    extend: 'Deft.mvc.ViewController',
    mixins: [ 'Deft.mixin.Injectable'],
    inject: {
    	formUtils: 'formRendererUtils',
    	model: 'currentStudentIntake',
		termsStore: 'termsStore'
    },
    control: {
    	careerDecidedCheckOn: '#careerDecidedCheckOn',
    	careerDecidedCheckOff: '#careerDecidedCheckOff',
    	confidentInAbilitiesCheckOn: '#confidentInAbilitiesCheckOn',
    	confidentInAbilitiesCheckOff: '#confidentInAbilitiesCheckOff',
    	additionalAcademicProgramInformationNeededCheckOn: '#additionalAcademicProgramInformationNeededCheckOn',
    	additionalAcademicProgramInformationNeededCheckOff: '#additionalAcademicProgramInformationNeededCheckOff',
		anticipatedGraduationDateTermCodeCombo: '#anticipatedGraduationDateTermCodeCombo'
    },
	init: function() {
		var me=this;

		var personEducationGoal = me.model.get('personEducationGoal');
		var careerDecided = me.model.get('personEducationGoal').get('careerDecided')
		var confidentInAbilities = me.model.get('personEducationGoal').get('confidentInAbilities');
		var additionalAcademicProgramInformationNeeded = me.model.get('personEducationGoal').get('additionalAcademicProgramInformationNeeded');
		
		if ( personEducationGoal != null && personEducationGoal != undefined )
		{
			me.getCareerDecidedCheckOn().setValue( careerDecided );
			me.getCareerDecidedCheckOff().setValue( !careerDecided );
			
			me.getConfidentInAbilitiesCheckOn().setValue( confidentInAbilities );
			me.getConfidentInAbilitiesCheckOff().setValue( !confidentInAbilities );
			
			me.getAdditionalAcademicProgramInformationNeededCheckOn().setValue( additionalAcademicProgramInformationNeeded );
			me.getAdditionalAcademicProgramInformationNeededCheckOff().setValue( !additionalAcademicProgramInformationNeeded );
		}		

		if(me.termsStore.getTotalCount() == 0){
				me.termsStore.addListener("load", me.onTermsStoreLoad, me);
				me.termsStore.load();
		}else{
			me.initialiseGraduationDates();
		}
	
		
		return me.callParent(arguments);
    },
	
	onTermsStoreLoad:function(){
		var me = this;
		me.termsStore.removeListener( "onTermsStoreLoad", me.onTermsStoreLoad, me );
		me.initialiseGraduationDates();
	},
	
	initialiseGraduationDates: function(){
		var me = this;
		var futureTermsStore = me.termsStore.getCurrentAndFutureTermsStore(true);
		var currentCode = me.getAnticipatedGraduationDateTermCodeCombo().getValue();
		me.getAnticipatedGraduationDateTermCodeCombo().bindStore(futureTermsStore);
		me.getAnticipatedGraduationDateTermCodeCombo().setValue(currentCode);
	}
});