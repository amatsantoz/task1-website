+ function ($) {
  $('.palceholder').click(function () {
    $(this).siblings('input').focus();
  });

  $('.form-control').focus(function () {
    $(this).parent().addClass("focused");
  });

  $('.form-control').blur(function () {
    var $this = $(this);
    if ($this.val().length == 0)
      $(this).parent().removeClass("focused");
  });
  $('.form-control').blur();

  // validetion
  $.validator.setDefaults({
    errorElement: 'span',
    errorClass: 'validate-tooltip'
  });

  $("#formvalidate").validate({
    rules: {
      username: {
        required: true,
        minlength: 6
      },
      password: {
        required: true,
        minlength: 6
      },
      fullname: {
        required: true,
        minlength: 6
      },
      email: {
        required: true,
        minlength: 6
      }
    },
    messages: {
      username: {
        required: "Please enter your username.",
        minlength: "Please provide valid username."
      },
      password: {
        required: "Enter your password.",
        minlength: "Incorrect login or password."
      },
      fullname: {
        required: "Enter your full name.",
        minlength: "Please provide valid full name."
      },
      email: {
        required: "Enter your email.",
        minlength: "Please provide valid email."
      }
    }
  });

}(jQuery);