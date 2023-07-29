qx.Theme.define("showcase.page.theme.calc.theme.appearance.Modern",
{
  appearances :
  {
    "modern-calculator" : "window",
    "modern-calculator-button" : "button",

    "modern-display" :
    {
      style : function(states)
      {
        return {
          decorator: "main",
          height : 40,
          padding: 3,
          marginBottom: 10
        }
      }
    },

    "modern-display/label" :
    {
      style : function(states)
      {
        return {
          font : "bold",
          marginLeft: 5
        }
      }
    },

    "modern-display/memory" : {
      style : function(states) {
        return {
          marginLeft: 5
        }
      }
    },

    "modern-display/operation" : {
      style : function(states) {
        return {
          marginLeft: 50
        }
      }
    },

    "modern-calculator/display" : "modern-display"
  }
});