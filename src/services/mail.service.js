export class MailService{
    constructor($http){
        this.$http = $http;
        this.from = "noreply.jscity@darkadia-studio.com";
        this.domain = "http://localhost:42420/"
        this.mailCore = this.getMailCore();
        this.sendActivationMail({email:"nivvdiy@darkadia-studio.com",username:"Nivvdiy",activationToken:"Test"});
        console.log("MailService Initialized");
    }

    sendActivationMail(user){
        var to = user.email
        var subject = "Activation de votre compte";
        var content = "";
        content += "Bonjour {{username}},<br><br>";
        content += "Vous venez de vous inscrire sur JS-CITY.<br>";
        content += "Pour pouvoir commencer à utiliser le site dans son intégralité, veuillez activer vote compte en cliquant <a href={{domain}}{{activationToken}}>ici</a><br>";
        content += "Si ce lien ne marche pas, copier et coller cette adresse dans la barre de lien de votre navigateur:<br>";
        content += "{{domain}}{{activationToken}}";

        var mail = this.mailCore.split("{{mailTitle}}").join(subject);
        mail = mail.split("{{mail-content}}").join(content);

        var message = mail;

        //console.log(message);

        var replace = {
            username:user.username,
            domain:this.domain,
            activationToken:user.activationToken
        }
        $.ajax({
            type: "POST",
            url: "https://www.darkadia-studio.com/mail.php",
            data: JSON.stringify({mailTo:to, mailFrom:this.from, subject:subject, message:message, replace:replace}),
            success: function(data){
                //console.log("Success",data);
            },
            error: function(data, error){
                //console.log("Error",error);
            },
            dataType: "json"
        });
    }

    getMailCore(){
        return "<!DOCTYPE html>"
            +"<html>"
            +"<head>"
            +"<title>{{mailTitle}}</title>"
            +'<meta http-equiv="Content-Type" content="text/html; charset=utf-8">'
            +'<meta content="width=device-width">'
            +'<style type="text/css">'
            +"/* Fonts and Content */"
            +"body, td, div { font-family: Arial, sans-serif; font-size: 14px; }"
            +"body { background-color: #ffffff; color: #000000; margin: 0px; padding: 0px; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; }"
            +".mail-main-table td { background-color:#252525; color: #ffffff; }"
            +".mail-title { padding-top: 12px; color: #e31937; font-size: 22px; }"
            +".mail-content { line-height: 1.5em; }"
            +".mail-subtext { padding-top: 12px; font-style: italic; font-size: x-small; }"
            +"a, a:focus, a:active, a:visited { color: #e31937; }"
            +"th {color: white; vertical-align: top; align: right;}"
            +"</style>"
            +"</head>"
            +"<body>"
            +'<table width="100%" cellpadding="0" cellspacing="0" border="0" >'
            +"<tbody>"
            +"<tr>"
            +'<td align="center">'
            +'<table class="mail-main-table" cellpadding="0" cellspacing="0">'
            +'<tbody>'
            +'<tr>'
            +'<td width="640" height="20"></td>'
            +'</tr>'
            +'<!-- entete -->'
            +'<tr class="pagetoplogo">'
            +'<td width="640" valign="middle" align="center">'
            +'<div class="pagetoplogo-content">'
            +'<img src="cid:mailLogo" alt="Logo 360" width="342" height="82"/>'
            +'</div>'
            +'</td>'
            +'</tr>'
            +'<!-- contenu -->'
            +'<tr class="content">'
            +'<td width="640">'
            +'<table width="640" cellpadding="0" cellspacing="0" border="0">'
            +'<tbody>'
            +'<tr>'
            +'<td width="30"></td>'
            +'<td width="580">'
            +'<!-- une zone de contenu -->'
            +'<h2 class="mail-title">'
            +'{{mail-title}}'
            +'</h2>'

            +'<div class="mail-content">'
            +'{{mail-content}}'
            +'</div>'

            +'<p class="mail-subtext">'
            +'Nota : ce mail est envoyé depuis une adresse générique : merci de ne pas y répondre.'
            +'</p>'
            +'<!-- fin zone -->'
            +'</td>'
            +'<td width="30"></td>'
            +'</tr>'
            +'</tbody>'
            +'</table>'
            +'</td>'
            +'</tr>'
            +'<!-- pied de page -->'
            +'<tr class="pagebottom">'
            +'<td width="640" height="40"></td>'
            +'</tr>'
            +'</tbody>'
            +'</table>'
            +'</td>'
            +'</tr>'
            +'</tbody>'
            +'</table>'
            +'</body>'
            +'</html>'
    }

}