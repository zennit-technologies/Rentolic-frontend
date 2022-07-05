import React from 'react'

const Code = () => {
  return (
    <>

      <div class="otp-page-wrapper">
        {/* <!-- <div class="btn-back"></div> --> */}
        <div class="otp-content-wrapper"><h4>Please Enter The One-Time Password to verify your account</h4><br />
          <span class="mobile-number">A One-Time Password has been sent to +91-xxxx-xxx-123 </span>
        </div>
        <form class="otp" autocomplete="off" novalidate>
          <fieldset>
            <input maxlength="1" />
            <input maxlength="1" />
            <input maxlength="1" />
            <input maxlength="1" />
            <input maxlength="1" />
            <input maxlength="1" />
          </fieldset>
        </form>
        <div class="p_button">
          <a class="havent-received">VALIDATE</a>
        </div>

      </div>
    </>
  )
}

export default Code
