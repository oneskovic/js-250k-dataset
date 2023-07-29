(function (win, $, _) {
  'use strict';

  $(function () {
    $('.books-widget button.showGrid').click(function () {
      $('.books-widget .showing-books').removeClass('book-list');
      $('.books-widget .showing-books').addClass('book-thumb');
      $('.books-widget .showing-books').nextAll().removeClass('book-list');
      $('.books-widget .showing-books').nextAll().addClass('book-thumb');
    });

    $('.books-widget button.showList').click(function () {
      $('.books-widget .showing-books').removeClass('book-thumb');
      $('.books-widget .showing-books').addClass('book-list');
      $('.books-widget .showing-books').nextAll().removeClass('book-thumb');
      $('.books-widget .showing-books').nextAll().addClass('book-list');
    });
    $('.front-page .books-widget button.create-book').click(function () {
      win.location.href = $(this).attr('data-href');
    });

    $('.front-page .groups-widget button.create-group').click(function () {
      win.location.href = $(this).attr('data-href');
    });


    function handleSteps() {
      // handling the check all books checkbox
      $('#wizard-invite').on('change', '#check_all', function () {
        var booksList = $('#wizard-invite .books-list input');
        booksList.prop('checked', $(this).prop('checked'));
      });
      $('#wizard-invite').on('change', '.books-list input', function () {
        var booksList = $('#wizard-invite .books-list input');
        $('#wizard-invite #check_all').prop('checked', _.every(_.map(booksList, function (book) {
          return $(book).prop('checked');
        })));
      });

      $('#wizard-invite').steps({
        headerTag: 'h3',
        bodyTag: 'section',
        transitionEffect: 'slideLeft',
        autoFocus: true,
        onFinished: function (event, currentIndex) {
          var data = $('#inviteWizard form').serialize(),
            url = $('#inviteWizard form').attr('action');
          $.post(url, data).then(function (response) {
            $('#inviteWizard').modal('hide');

            // clearing the input
            $('#inviteWizard form :input')
              .not(':button, :submit, :reset')
              .not('[name="csrfmiddlewaretoken"]')
              .removeAttr('checked')
              .removeAttr('selected')
              .not(':checkbox, select')
              .val('')
              .removeAttr('value');
            $('#inviteWizard form .roles-options .btn').removeClass('active')

            $('#wizard-invite').steps('destroy');
            handleSteps();

            alert(win.booktype._('invite_sent', 'You invitation has been sent'));
          });
        },

        onStepChanging: function (event, currentIndex, newIndex) {
          // always allow step back
          if (currentIndex > newIndex) {
            return true;
          }

          // email list
          if (currentIndex === 0) {
            var emailListString = $('#wizard-invite').find('#id_email_list').val();
            return validateEmailString(emailListString);
          }

          // message
          if (currentIndex === 1) {
            var message = $('#wizard-invite').find('#id_message').val();
            return message.trim() !== '';
          }

          // book selection
          if (currentIndex === 2) {
            var selectedBooks = $('#wizard-invite .books-list input:checked');
            if (selectedBooks.size() < 1) {
              return false;
            }
          }

          return true;
        }
      });
    }

    handleSteps();
  });


  function validateEmailString(emailListString) {
    var emailList = _.compact(_.map(emailListString.split(','), function (email) {
      return email.trim();
    }));

    if (emailList.length < 1) {
      return false;
    }

    var emailListValidation = _.map(emailList, function (email) {
      return validateEmail(email);
    });

    return _.every(emailListValidation);
  }

})(window, jQuery, _);
