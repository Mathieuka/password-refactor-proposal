# Strengthen user account's password security

## Use case
As a software security manager
I want to strengthen private access to my application
In order to avoid user account hacking

## General rules
- A password should not have two same characters in a row regardless of the character case.
- It should not have three same characters in the whole password regardless of the character case.

### Valid examples

 - @Azerty123
 - $JohnDoe0

### Invalid examples
- AAzerty123
- Aazerty123
- AzerAtyA123
- AzeratyA123

## Acceptance tests

### Registration should throw an error when an invalid password is submitted
> **When** an user registers with his mail "sample@mail.com" and the password "AAzerty123" 
>
> **Then** the following error is thrown "**Unsecured password submitted.**"

### Change user account's password should throw an error when an invalid password is submitted
> **Given** an already registered user "sample@mail.com" 
>
> **When** the user "sample@mail.com" changes his password to "AAzerty123" 
>
> **Then** the following error is thrown "**Unsecured password submitted.**"
