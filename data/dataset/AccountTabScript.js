function pocketSuccessCallback(username, password) {
    settings.pocketUsername = username
    settings.pocketPassword = password
    loadingRect.visible = false
    infoBanner.showText(qsTr("Signed in to Pocket successfully"))
}

function pocketFailureCallback(errorCode) {
    loadingRect.visible = false
    infoBanner.showText(qsTr("Error signing in to Pocket (%1)").arg(errorCode))
}

function instapaperSuccessCallback(oauthToken, oauthTokenSecret) {
    settings.instapaperToken = oauthToken
    settings.instapaperTokenSecret = oauthTokenSecret
    loadingRect.visible = false
    infoBanner.showText(qsTr("Signed in to Instapaper successfully"))
}

function instapaperFailureCallback(errorCode) {
    loadingRect.visible = false
    infoBanner.showText(qsTr("Error signing in to Instapaper (%1)").arg(errorCode))
}

var __signInDialog = null

function createPocketSignInDialog() {
    if (!__signInDialog) __signInDialog = Qt.createComponent("../Dialog/SignInDialog.qml")
    var dialog = __signInDialog.createObject(settingPage, { titleText: qsTr("Sign in to Pocket") })
    dialog.signIn.connect(function(username, password) {
        Pocket.authenticate(constant, username, password, Script.pocketSuccessCallback, Script.pocketFailureCallback)
        loadingRect.visible = true
    })
}

function createInstapaperSignInDialog() {
    if (!__signInDialog) __signInDialog = Qt.createComponent("../Dialog/SignInDialog.qml")
    var dialog = __signInDialog.createObject(settingPage, { titleText: qsTr("Sign in to Instapaper")})
    dialog.signIn.connect(function(username, password) {
        Instapaper.getAccessToken(constant, username, password, Script.instapaperSuccessCallback,
                                  Script.instapaperFailureCallback)
        loadingRect.visible = true
    })
}

function createTwitterSignOutDialog() {
    var message = qsTr("Do you want to sign out from your Twitter account? All other accounts will also automatically sign out. All settings will be reset.")
    dialog.createQueryDialog(qsTr("Twitter Sign Out"), "", message, function() {
        Database.clearTable("Timeline")
        mainPage.timeline.removeAllTweet();
        Database.clearTable("Mentions")
        mainPage.mentions.removeAllTweet();
        Database.clearTable("DM")
        mainPage.directMsg.removeAllDM()
        Database.clearTable("ScreenNames")
        settings.resetAll()
        cache.clearAll()
        window.pageStack.push(Qt.resolvedUrl("../SignInPage.qml"))
    })
}

function createPocketSignOutDialog() {
    var message = qsTr("Do you want to sign out from your Pocket account?")
    dialog.createQueryDialog(qsTr("Pocket Sign Out"), "", message, function() {
        settings.pocketUsername = ""
        settings.pocketPassword = ""
        infoBanner.showText(qsTr("Signed out from your Pocket account successfully"))
    })
}

function createInstapaperSignOutDialog() {
    var message = qsTr("Do you want to sign out from your Instapaper account?")
    dialog.createQueryDialog(qsTr("Instapaper Sign Out"), "", message, function() {
        settings.instapaperToken = ""
        settings.instapaperTokenSecret = ""
        infoBanner.showText(qsTr("Signed out from your Instapaper account successfully"))
    })
}
