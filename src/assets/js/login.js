$(document).ready(function () {
  $('.form').slideDown(500)

  $('#registered').click(function () {
    toRegis()
  })

  $('#landing').click(function () {
    toLogin()
  })

  $(document).keyup(function (event) {
    if (event.keyCode === 13) {
      if ($('#landing-content').css('display') !== 'none') {
        $('#login').click()
      } else {
        $('#register').click()
      }
    }
  })
})

function toLogin () {
  $('#registered').removeClass('on')
  $('#registered').addClass('not-on')
  $('#landing').addClass('on')
  $('#landing-content').show(500)
  $('#registered-content').hide(500)
}

function toRegis () {
  $('#landing').removeClass('on')
  $('#landing').addClass('not-on')
  $('#landing-content').hide(500)
  $('#registered').addClass('on')
  $('#registered-content').show(500)
}
