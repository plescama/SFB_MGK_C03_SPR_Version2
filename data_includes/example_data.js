//This list will be used to simulate the task of the new SPR experiment


PennController.ResetPrefix(null);

function Pick(set,n) {
    assert(set instanceof Object, "First argument of pick cannot be a plain string");
    n = Number(n);
    if (isNaN(n) || n<0) n = 0;
    this.args = [set];
    set.remainingSet = null;
    this.run = function(arrays){
        if (set.remainingSet===null) set.remainingSet = arrays[0];
        const newArray = [];
        for (let i = 0; i < n && set.remainingSet.length; i++)
            newArray.push( set.remainingSet.shift() );
        return newArray;
    }
        }
        function pick(set, n) { return new Pick(set,n); }




    PennController.AddHost("https://amor.cms.hu-berlin.de/~plescama/pictures_WP1/")
   // PennController.AddHost("https://amor.cms.hu-berlin.de/~plescaan/Master/")  ~ OLD SERVER HOST ~
   PennController.DebugOff() // use for the final version
    PennController.Sequence( "welcome","demographics",
    "instructions",
    "practice", "end_practice",
    pick(list = seq("experiment_trial"),30),
      "break1", //30
     pick(list,30), "break2", //60
    pick(list,30), "break3", //90
    pick(list,30), 
        "end_exp", //120
    "post-ques", "send", "final");


// create dashed function
// Splits the sentence according to * boundaries and then creates blanks by splitting words with spaces and then takes the chunks and transforms them to underscores.
// All are joined by spaces
dashed = (sentence, remove) => {
    let words = sentence.split('*'),  blanks = words.map(w=>w.split('').map(c=>'_').join('') ); // 'sentence.spilot('*')' = '*' defines the chunk boundaries (in the .csv)
    let textName = 'dashed'+words.join('');
    // We'll return cmds: the first command consists in creating (and printing) a Text element with dashes
    let cmds = [ newText(textName, blanks.join(' ')).print()
    .settings.css("font-family","courier")
    .settings.css("font-size", "20px")
    //.settings.css("font-size", "2em")  
    .settings.center()
    .cssContainer({
    "width": "90vw"})
    ]; // COURIER as font
// We'll go through each word, and add two command blocks per word
for (let i = 0; i <= words.length; i++)
    cmds = cmds.concat([ newKey(words[i], " ").log().wait() , // Wait for (and log) a press on Space
                         getText(textName).text(blanks.map((w,n)=>(n==i?words[n]:w)).join(' ')) ]); // Show word
if (remove)  // Remove the text after the last key.wait() is parameter specified
    cmds.push(getText(textName).remove());
return cmds;
};

// create cumulative function
cumulative = (sentence, remove) => {
    let words = sentence.split('*'),  blanks = words.map(w=>w.split('').map(c=>'_').join('') ); // 'sentence.split('*')' = '*' defines the chunk boundaries (in the .csv)
    let textName = 'cumulative'+words.join('');
    // We'll return cmds: the first command consists in creating (and printing) a Text element with dashes
    let cmds = [ newText(textName, blanks.join(' ')).print() .settings.css("font-family","courier") .settings.css("font-size", "25px") .print("20vw","50vh")]; // COURIER as font
    // We'll go through each word, and add two command blocks per word
    for (let i = 0; i <= words.length; i++)
    cmds = cmds.concat([ newKey('cumulative'+i+words[i], " ").log().wait() , // Wait for (and log) a press on Space
    getText(textName).text(blanks.map((w,n)=>(n<=i?words[n]:w)).join(' ')) ]); // Show word
    if (remove)  // Remove the text after the last key.wait() is parameter specified
    cmds.push(getText(textName).remove());
    return cmds;
};

// create cumulative function
cumulative_ctxt = (sentence, remove) => {
    let words = sentence.split('*'),  blanks = words.map(w=>w.split('').map(c=>'_').join('') ); // 'sentence.split('*')' = '*' defines the chunk boundaries (in the .csv)
    let textName = 'cumulative'+words.join('');
    // We'll return cmds: the first command consists in creating (and printing) a Text element with dashes
    let cmds = [ newText(textName, blanks.join(' '))
    //.print()
    .settings.css("font-family","courier")
    .settings.css("font-size", "23px")
    .print("center at 50%", "middle at 50%")
    //.print(250,240)
    //.settings.css("font-size", "0.5em")  
    // .cssContainer({"width": "90vw"})
    ];
    // COURIER as font
    // We'll go through each word, and add two command blocks per word
    for (let i = 0; i <= words.length; i++)
    cmds = cmds.concat([ newKey('context'+i+'-'+words[i], " ").log().wait() , // Wait for (and log) a press on Space
    getText(textName).text(blanks.map((w,n)=>(n<=i?words[n]:w)).join(' ')) ]); // Show word
    if (remove)  // Remove the text after the last key.wait() is parameter specified
    cmds.push(getText(textName).remove());
    return cmds;
};




// create cumulative function
cumulative_crit = (sentence, remove) => {
    let words = sentence.split('*'),  blanks = words.map(w=>w.split('').map(c=>'_').join('') ); // 'sentence.split('*')' = '*' defines the chunk boundaries (in the .csv)
    let textName = 'cumulative'+words.join('');
    // We'll return cmds: the first command consists in creating (and printing) a Text element with dashes. .print(50,340)
    let cmds = [ newText(textName, blanks.join(' ')).print() .settings.css("font-family","courier") .settings.css("font-size", "23px").print("center at 50%", "middle at 50%")]; // COURIER as font
    // We'll go through each word, and add two command blocks per word
    for (let i = 0; i <= words.length; i++)
    cmds = cmds.concat([ newKey('critical'+i+'-'+words[i], " ").log().wait() , // Wait for (and log) a press on Space
    getText(textName).text(blanks.map((w,n)=>(n<=i?words[n]:w)).join(' ')) ]); // Show word
    if (remove)  // Remove the text after the last key.wait() is parameter specified
    cmds.push(getText(textName).remove());
    return cmds;
};

// create cumulative function
cumulative_crit_practice = (sentence, remove) => {
    let words = sentence.split('*'),  blanks = words.map(w=>w.split('').map(c=>'_').join('') ); // 'sentence.split('*')' = '*' defines the chunk boundaries (in the .csv)
    let textName = 'cumulative'+words.join('');
    // We'll return cmds: the first command consists in creating (and printing) a Text element with dashes. .print(50,340)
    let cmds = [ newText(textName, blanks.join(' ')).print().settings.css("border", "solid 1px red") .settings.css("font-family","courier").settings.css("font-size", "23px").print("center at 50%", "middle at 50%")]; // COURIER as font
    // We'll go through each word, and add two command blocks per word
    for (let i = 0; i <= words.length; i++)
    cmds = cmds.concat([ newKey('critical'+i+'-'+words[i], " ").log().wait() , // Wait for (and log) a press on Space
    getText(textName).text(blanks.map((w,n)=>(n<=i?words[n]:w)).join(' ')) ]); // Show word
    if (remove)  // Remove the text after the last key.wait() is parameter specified
    cmds.push(getText(textName).remove());
    return cmds;
};


//*********************************************************************************************************************************************************************************************
// INTRO
//********************************************************************************************************************************************************************************************

PennController("welcome",
               
        fullscreen()
        ,
        defaultText
            .print()
        ,       
        newText("text2", "<p>Humboldt-Universit&auml;t zu Berlin, Institut f&uuml;r Deutsche Sprache und Linguistik </p>")
        .settings.center()
        .settings.css("font-style","italic")
       
        ,
        newText("text1", "<h2>Willkommen und Danke, dass Du Dir die Zeit nimmst, an unserem Experiment teilzunehmen!</h2>")
        .settings.center()
        .settings.css("font-size", "large")

        ,
        newText("browser_info", "<br> Bitte stelle sicher, dass Du das Experiment <b>nur mit Mozilla Firefox oder Google Chrome</b> durchf&uuml;hrst.")
        .settings.css("font-size", "large")
       .settings.center()
        ,
        newText("bi", "Versuche bitte <b>nicht</b>, das Experiment auf dem Tablet oder auf dem Mobiltelefon auszuf&uuml;hren, sondern nur am Laptop oder PC.")
        .settings.center()
        .settings.css("font-size", "large")
        ,
        newText("bi2", "Stelle au&szlig;erdem sicher, dass Dein Browserfenster im Vollbildmodus ist.")
        .settings.center()
        .settings.css("font-size", "large")
        ,
        newText("bi3", "W&auml;hle einen bequemen und ruhigen Platz f&uuml;r die n&auml;chsten 15 Minuten! Vielen Dank!")
        .settings.center()
        .settings.css("font-size", "large")
        ,        
                
        newText("br", "<br>")
        .print()
        ,        
        newButton("button1", "Start").settings.css("font-size", "20px")
            .settings.center()
            .print()
            .wait()
        ,
        getText("text1")
            .remove()
       
        ,
        getText("browser_info")
        .remove()
        ,
        getText("text2")
        .remove()
        ,
        getText("bi")
        .remove()
        ,
         getText("bi2")
        .remove()
        ,
        getText("bi3")
        .remove()
        ,
        getText("br")
        .remove()
        ,       
        getButton("button1")
          .remove()
        ,
         newHtml("consentInfo", "consentInfo.html")
          .settings.center()
           .print()
          .checkboxWarning("Bitte die Checkbox abhaken um fortzufahren!")
        ,
         newButton("button2", "Fortsetzen").settings.css("font-size", "20px")
         .settings.center()
         .print()
          .wait(
           getHtml("consentInfo").test.complete()
           .failure(getHtml("consentInfo").warn())
               )      
        ,
        getHtml("consentInfo")
        .remove()
        ,
        getButton("button2")
        .remove()
        ,
        fullscreen() 
             
               
)

.setOption("countsForProgressBar", false)   // no need to see the progress bar in the intro phase
.setOption("hideProgressBar", true);


//// DEMOGRAPHICS ==============================================================
PennController("demographics",
        
               
        newText("demo", "<b>Personenbezogene Daten</b> <p>Wir brauchen einige Angaben zu Deiner Person. Diese werden anonymisiert gespeichert und eine spätere Zuordnung zu Dir wird nicht möglich sein. Bitte nimm Dir beim Ausfüllen der Felder Zeit. Scrolle bitte nach unten um alle Fragen zu beantworten<p>")              
        .settings.css("font-family","times new roman") .settings.css("font-size", "18px")
        //.settings.italic()

               ,
                  
               newCanvas("democanvas", 1000,120)
               .settings.add(20,0, getText("demo"))
               //.settings.center()
               .print()
               ,
               newDropDown("age", "Bitte eine Option ausw&auml;hlen")
               .settings.add("18" , "19" , "20", "21" , "22" , "23", "24" , "25" , "26", "27" , "28" , "29", "30" , "über 31")
               .settings.log()
               
               ,
               newText("agetext", "1. Alter:")
               .settings.css("font-size", "18px")
               .settings.bold()
               ,
               newCanvas("agecanvas", 1000, 40)
               .settings.add(20,0,getText("agetext"))
               .settings.add(450,2, getDropDown("age"))
               //.settings.center()
               .print()
               ,
               newText("sex", "2. Geschlecht:")
               .settings.css("font-size", "18px")
               .settings.bold()
               ,
               newDropDown("sex", "Bitte eine Option ausw&auml;hlen")
               .settings.add("Weiblich", "M&auml;nnlich", "Divers")
               .settings.log()
               ,
               newCanvas("sexcanvas", 1000, 40)
               .settings.add(20, 0, getText("sex"))
               .settings.add(450,3, getDropDown("sex"))
               //.settings.center()
               .print()
               ,
               newText("german", "3. Ist Deutsch Deine Muttersprache?")
               .settings.css("font-size", "18px")
               .settings.bold()
               ,
               newDropDown("german", "Bitte eine Option ausw&auml;hlen")
               .settings.add("Ja", "Nein")
               .settings.log()
               ,
               newCanvas("germancanvas", 1000, 40)
               .settings.add(20, 0, getText("german"))
               .settings.add(450,3, getDropDown("german"))
               //.settings.center()
               .print()
               ,
               newText("bilingual", "<b>4. Bist Du bilingual aufgewachsen (hast Du vor Deinem 6. Lebensjahr eine andere Sprache als Deutsch gelernt)?</b><br><small>(Falls Du Ja ausgewählt hast, schreibe bitte auf, mit welcher (welchen) anderen Sprache(n) Du aufgewachsen bist)</small><br><br>")
               .settings.css("font-size", "18px")
               
               , 
               newTextInput("bilingualinput", "")
               .settings.size(150,40)
               .settings.log()
               .settings.hidden()
               ,
               newText("bilingual_input", "")
               .settings.after(getTextInput("bilingualinput"))
               ,
               newDropDown("bilingual",  "<br>" +"Bitte eine Option ausw&auml;hlen")
               .settings.add("Ja", "Nein")
               .settings.log()
               .settings.after(getText("bilingual_input"))
               .settings.callback(
                   getDropDown("bilingual")
                   .test.selected("Ja")
                   .success(getTextInput("bilingualinput").settings.visible(
                    
                   )) )
               ,
               newCanvas("bilingual", 1000, 40)
               .settings.add(20, 0, getText("bilingual"))
               .settings.add(870,3, getDropDown("bilingual"))
               //.settings.center()
               .print()
               ,
               newCanvas("filler", 1, 20)
               
               .print()
               ,
               newText("abschluss", "5. <b>Was ist Dein h&ouml;chster Bildungsabschluss:</b><br><small>(Falls Du Sonstige ausgewählt hast, schreibe bitte auf, welche Dein h&ouml;chster Bildungsabschluss ist)</small><br><br>")
               .settings.css("font-size", "18px")
               
               , 
               newTextInput("abschlussinput", "")
               .settings.size(150,40)
               .settings.log()
               .settings.hidden()
               ,
               newText("abschluss_input", "")
               .settings.after(getTextInput("abschlussinput"))
               ,
               newDropDown("abschluss", "Bitte eine Option ausw&auml;hlen")
               .settings.add("kein Abschluss","Schulabschluss","Abitur oder gleichwertiger Abschluss","Bachelor","Master", "Promotion", "Ausbildung", "Sonstige")     // MAYBE ADD QUESTIONS ABOUT DIALECT AND DOMINANT HAND
               //.settings.size(191,20)
               .settings.log()
               .settings.after(getTextInput("abschlussinput")) //
               .settings.callback(
                   getDropDown("abschluss")
                   .test.selected("Sonstige")
                   .success(getTextInput("abschlussinput").settings.visible(
                   
                   )) )
               ,
               newCanvas("abschlusscanvas", 1000, 40)
               .settings.add(20, 0, getText("abschluss"))
               .settings.add(870,3, getDropDown("abschluss"))
               //.settings.center()
               .print()
               ,
               
               newCanvas("filler", 1, 20)
               .print()
              //location of error ,
              ,
               newText("Leiter","<b>6.</b> Stell Dir vor, <b>die untenstehende Leiter</b> repr&auml;sentiert den relativen Sozialstatus der Menschen in Deutschland. "
                       +"An der Spitze der Leiter stehen Menschen mit relativ hohem Status – diejenigen, die das meiste Geld, die beste Bildung und die angesehensten Arbeitspl&auml;tze haben. Ganz unten sind Menschen mit relativ niedrigem Status – beispielsweise als arbeitslos Gemeldete. Relativ weit unten zu verorten w&auml;ren auch diejenigen, die nur wenig Geld verdienen, einen niedrigen Bildungstand haben, und / oder Berufe aus&uuml;ben, die die Gesellschaft als eher wenig respektabel ansieht."
                       +"<br> Wo w&uuml;rdest Du Dich auf dieser Leiter einordnen? W&auml;hle bitte die Sprosse, die Deinem empfundenen Sozialstatus am ehesten entspricht.")
               .settings.css("font-size", "18px")
               ,
               newDropDown("leiter", "Bitte eine Option ausw&auml;hlen")
               .settings.add("A", "B", "C","D", "E", "F","G", "H", "I","J")
               .settings.log()
               ,
               newImage("leiter", "https://amor.cms.hu-berlin.de/~patarroa/Leiter.jpeg")
               .settings.size(200,300)
               ,
               newCanvas("leitercanvas", 1000,20)
               .settings.add(20, 10, getText("Leiter"))
               //.settings.center()
               .print()
               ,
               newCanvas("leitercanvas2", 1000,350)
               .settings.add(350,150, getImage("leiter"))
               .settings.add(650,300, getDropDown("leiter"))
               //.settings.center()
               .print()
               ,
               newText("degeboren", "7. Bist Du in Deutschland geboren?")
               .settings.css("font-size", "18px")
               .settings.bold()
               ,
               newDropDown("degeboren", "Bitte eine Option ausw&auml;hlen")
               .settings.add("Ja", "Nein")
               .settings.log()
               //.settings.size(200,40)
               ,
               newCanvas("degeboren", 1000,190)
               .settings.add(20, 170, getText("degeboren"))
               .settings.add(400,170,getDropDown("degeboren"))
               //.settings.center()
               .print()
               ,
               newText("native", "<b>8. Wie wurde bei Dir zuhause gesprochen?</b><br><small>(Falls Du A, D, F oder G ausgewählt hast, schreibe bitte auf, mit welchen Dialekten Du aufgewachsen bist)</small>")
               .settings.css("font-size","18px")
         
               ,
               newTextInput("native_dialekt", "")
               .settings.size(200,30)
               .settings.log()
               .settings.hidden()
               ,
               newText("native_dialekt_input", "")
               .settings.after(getTextInput("native_dialekt"))
               ,
               newDropDown("language", "Bitte eine Option ausw&auml;hlen")
               .settings.add("A. Dialekt", "B. Umgangssprache", "C. Gepflegtes Hochdeutsch", "D. Alle", "E. B und C", "F. A und C", "G. A und B")
               //.settings.size(200,40)
               .settings.log()
               .settings.after(getText("native_dialekt_input"))
               .settings.callback(
                   getDropDown("language")
                   .test.selected("A. Dialekt")
                   .success(getTextInput("native_dialekt").settings.visible())
                   //    .failure(getTextInput("dialekt").settings.hidden())
                   
                   .test.selected("B. Umgangssprache")
                   .success(getTextInput("native_dialekt").settings.hidden())
                   
                   .test.selected("C. Gepflegtes Hochdeutsch")
                   .success(getTextInput("native_dialekt").settings.hidden())
               
                   .test.selected("D. Alle")
                   .success(getTextInput("native_dialekt").settings.visible())
                   //      .failure(getTextInput("dialekt").settings.hidden())
                   
                   .test.selected("E. B und C")
                   .success(getTextInput("native_dialekt").settings.hidden())
                   
                   .test.selected("F. A und C")
                   .success(getTextInput("native_dialekt").settings.visible())
                   // .failure(getTextInput("dialekt").settings.hidden())
                   
                   .test.selected("G. A und B")
                   .success( getTextInput("native_dialekt").settings.visible())
                   //  .failure(getTextInput("dialekt").settings.hidden())
                   )
        
               ,
               newCanvas("languagecanvas", 1000,75)
              .settings.add(20, 40, getText("native"))
              .settings.add(680,40, getDropDown("language"))
              //.settings.center()
              .print()
               
               ,
               newText("current", "<b>9. Wie sprichst Du aktuell haupts&auml;chlich?</b><br><small>(Falls Du A, D, F oder G ausgewählt hast, schreibe bitte auf, welche Dialekte Du verwendest)</small>")
               .settings.css("font-size", "18px")

               ,
               newTextInput("current_dialekt", "")
               .settings.log()
               .settings.size(200,30)
               .settings.hidden()
               ,
               newText("current_dialekt_input", "")
               .settings.after(getTextInput("current_dialekt"))
               ,
               newDropDown("current_dial", "Bitte eine Option ausw&auml;hlen")
               .settings.add("A. Dialekt", "B. Umgangssprache", "C. Gepflegtes Hochdeutsch", "D. Alle", "E. B und C", "F. A und C", "G. A und B")
               .settings.log()
               //.settings.size(200,40)
               .settings.after(getText("current_dialekt_input"))
               .settings.callback(
                   
                   getDropDown("current_dial")
                   .test.selected("A. Dialekt")
                   .success(getTextInput("current_dialekt").settings.visible())
                  
                  
                   .test.selected("B. Umgangssprache")
                   .success(getTextInput("current_dialekt").settings.hidden())
                   
                   .test.selected("C. Gepflegtes Hochdeutsch")
                   .success(getTextInput("current_dialekt").settings.hidden())
              
                   .test.selected("D. Alle")
                   .success(getTextInput("current_dialekt").settings.visible())
                 
                   
                   .test.selected("E. B und C")
                   .success(getTextInput("current_dialekt").settings.hidden())
                   
                   .test.selected("F. A und C")
                   .success(getTextInput("current_dialekt").settings.visible())
                  
                   
                   .test.selected("G. A und B")
                   .success( getTextInput("current_dialekt").settings.visible())
                   

               )
               ,
               newCanvas("current_dialekt_canvas", 1000, 75)
               .settings.add(20, 40, getText("current"))
               .settings.add(680,40, getDropDown("current_dial"))
               //.settings.center()
               .print()   
               ,
               newText("dialectcomp", "<b>10. Wenn Du einen Dialekt sprichst, wie gut kannst Du ihn sprechen/verstehen?</b><br><small>(Skala von 0 - 'gar nicht' bis 100 'ausgezeichnet')</small>")
               .settings.css("font-size", "18px")
               ,
               newTextInput("dial_comp", "")
               .log()
               .size(200, 40)
               .print()
               ,
               newCanvas("dial_comp_canv", 1000, 75)
               .settings.add(20, 40, getText("dialectcomp"))
               .settings.add(680,30, getTextInput("dial_comp"))
               //.settings.center()
               .print()   
               ,
               newText("hochsprcomp", "<b>11. Wie gut sprichst und verstehst Du Hochdeutsch?</b><br><small>(Skala von 0 - 'gar nicht' bis 100 'ausgezeichnet')</small>")
               .settings.css("font-size", "18px")
               ,
               newTextInput("hoch_comp", "")
               .settings.log()
               .lines(0)
               .size(200, 40)
               .print()
               ,
               newCanvas("hoch_comp_canv", 1000, 75)
               .settings.add(20, 40, getText("hochsprcomp"))
               .settings.add(680,30, getTextInput("hoch_comp"))
               //.settings.center()
               .print()   
               ,        
               newCanvas("filler2", 1, 40)
               .print()
               ,
               
    newButton("continue", "Weiter")
               .settings.css("font-family", "calibri").settings.css("font-size", "20px")
               //.settings.center()
               .settings.log()
               .print()
               .wait(
            newFunction('dummy', ()=>true).test.is(true)
            .and( getDropDown("age").test.selected()
                    .failure( newText('errorage', "Bitte gib Dein Alter an.").color("red").print() )
            // sex
            ).and( getDropDown("sex").test.selected()
                    .failure( newText('errorsex', "Bitte gib Dein Geschlecht an.").color("red").print() )
            // german
            ).and( getDropDown("german").test.selected()
                    .failure( newText('errorgerman', "Bitte gib Informationen &uuml;ber Deine Muttersprache an.").color("red").print() )
            // bilingual
            ) .and( getDropDown("bilingual").test.selected()
                    .failure( newText('errorbilingual', "Bitte gib an, ob Du bilingual oder monolingual aufgewachsen bist.").color("red").print() )
            // language
            ).and( getDropDown("language").test.selected()
                    .failure( newText('langerror', "Bitte antworte auf die Frage bez&uuml;glich Deines sprachlichen Hintergrunds.").color("red").print() )
            // current dialect
            ).and( getDropDown("current_dial").test.selected()
                    .failure( newText('dialecterr', "Bitte antworte auf die Frage bez&uuml;glich der von Dir aktuell verwendeten Sprache.").color("red").print() )
            // abschluss
            ).and( getDropDown("abschluss").test.selected()
                   .failure( newText('abschlusserr', "Bitte antworte auf die Frage bez&uuml;glich Deines Abschlusses.").color("red").print() )
            ).and(getDropDown("leiter").test.selected()
                   .failure( newText('leitererr', "Bitte gib eine Variante auf der Leiter an.").color("red").print() )
            ).and(getDropDown("degeboren").test.selected()
                    .failure( newText('degeborenerr', "Bitte gib an, wo Du geboren wurdest.").color("red").print() )
            ).and(
              getTextInput("native_dialekt").test.printed()
               .success(getTextInput("native_dialekt")
                        .test.text(/^.*/) // testing if at 0 or more words were written in the input box
                         .failure(
                             newText("dialekterr","Bitte gib Informationen &uuml;ber die Sprachform mit der Du aufgewachsen bist an.")
                             .settings.color("red")
                             .print() )
                ) //end success
            ).and(
             getTextInput("current_dialekt").test.printed()
              .success(getTextInput("current_dialekt")
              .test.text(/^.*/)  // testing if at 0 or more words were written in the input box
              .failure(
                   newText("dialekterr1","Bitte gib Informationen &uuml;ber Deinen aktuellen Sprachgebrauch an.")
                   .settings.color("red")
                   .print())
            ) //success
            ).and(
             getTextInput("hoch_comp").test.text(/^.+/) // testing if at least one digit was written in the input box
                .failure(
                   newText("dialekterr2","Bitte gib Informationen &uuml;ber Deine Hochsprach-Kompetenz an.")
                   .settings.color("red")
                   .print())
            ).and(
            getTextInput("dial_comp").test.text(/^.+/) // testing if at least one digit was written in the input box
                   .failure(
                   newText("dialekterr3","Bitte gib Informationen &uuml;ber Deine Dialekt-Kompetenz an.")
                   .settings.color("red")
                   .print())
            ) )
               ,
               getDropDown("age").wait("first")
               ,
               getDropDown("sex").wait("first")
               ,
               getDropDown("language").wait("first")
               ,
               getDropDown("current_dial").wait("first")
               ,
               getDropDown("leiter").wait("first")
               ,
               getDropDown("abschluss").wait("first")
               ,
               getDropDown("degeboren").wait("first")
               ,
               getButton("continue")
               .remove()
               ,
               newText("<p>")
               .print()                               
)

.setOption("countsForProgressBar", false)   // no need to see the progress bar in the intro phase
.setOption("hideProgressBar", true);




PennController.ResetPrefix()




//*******************************************************************************************************************************************************************
// HOW TO BEHAVE & INSTRUCTIONS
//******************************************************************************************************************************************
PennController("instructions",
               
               newText("intro", "Vielen Dank f&uuml;r Deine Teilnahme an diesem Experiment! Das folgende Experiment besteht aus 3 Teilen: eine kurze &Uuml;bungsrunde, das tats&auml;chliche Experiment und ein Post-Experiment Fragebogen. Insgesamt wird es ca. 40 Minuten in Anspruch nehmen (inkl. 4 Pausen je 1 Minute).")
               .settings.css("font-size", "20px")
               ,
               
               newText("Remember", "Bitte denke daran, dass Du dieses Experiment <b>nur auf Deinem PC/Laptop mit Mozilla Firefox oder Google Chrome durchf&uuml;hren kannst</b>. Dein Fenster sollte im <b>Vollbildmodus</b> sein.<br> <br> Dr&uuml;cke die <b>Leertaste um fortzufahren</b>...")
               .settings.css("font-size", "20px")     
               ,
               newCanvas("introc", 900, 450)
               .settings.add(40,0, getText("intro"))
               .settings.add(40,80, getText("Remember"))
               .settings.center()
               .print()
               
               ,        
               newKey("intro", " ")
               .wait()
               ,
               getCanvas("introc")
               .remove()
               ,
               newText("precau", "<p>Weil <b>dies ein Experiment ist,</b> w&uuml;rden wir es sehr sch&auml;tzen, wenn Du die folgenden Schritte unternehmen k&ouml;nntest, um Deine Konzentration zu gew&auml;hrleisten: <p><t>&nbsp;&nbsp;&nbsp;&bull; <b>schalte jegliche Musik/Audio aus</b>, die Du vielleicht h&ouml;rst<p>&nbsp;&nbsp;&nbsp;&bull; <b>verzichte darauf, w&auml;hrend des Experiments zu chatten</B> oder jede andere Handlung au&szlig;er des Experiments vorzunehmen<p><t>&nbsp;&nbsp;&nbsp;&bull; Stell Dein <b>Handy auf lautlos</b> und lass es mit dem Screen nach unten oder au&szlig;er Reichweite liegen<p><t>&nbsp;&nbsp;&nbsp;&bull; k&uuml;mmere Dich um das Experiment, bis es vorbei ist (es gibt kurze Pausen)<p><t>&nbsp;&nbsp;&nbsp;&bull; verhalte Dich generell so, als w&auml;rst Du in unserem Labor! <p>Diese Schritte werden dazu beitragen, dass die Daten, die wir von dir sammeln, von hoher Qualit&auml;t sind. Bitte <b>dr&uuml;cke die Leertaste</b>, wenn Du diesen Schritten zustimmst.")
               .settings.css("font-size", "20px")
               ,
               newCanvas("preccanvas",900, 450)
               .settings.add(20,0, getText("precau"))
               .settings.center()        
               .print()   
               ,
               newKey("set-up"," ")
               .wait()
               ,     
               getCanvas("preccanvas")
               .remove()
               ,
               
               newText("instructions_a", "<b>Deine Aufgaben w&auml;hrend des Experiments:</b><p>"
                       + "In diesem Experiment wirst Du Bilder sehen, sowie S&auml;tze &uuml;ber Menschen, Handlungen und Berufe lesen. Dabei wird die Verarbeitung der Sprache im Kontext untersucht."
                       + "<p>(1) <b>Als erstes wirst du einen Kontextsatz lesen.</b> Lies ihn Satzteil f&uuml;r Satzteil, indem Du die Leertaste dr&uuml;ckst. "
                       + "<p>Sobald Du jeden Satzteil (Wort) gelesen hast, dr&uuml;cke die <b>Leertaste</b> <b>mit dem rechten/linken Daumen</b>, um den n&auml;chsten Satzteil zu enth&uuml;llen."
                       + "Wenn Du das Ende des Satzes erreicht hast, dr&uuml;cke erneut die Leertaste."
                       + "<p><b>Dr&uuml;cke die Leertaste erst dann, wenn Du jeden Satzteil vollst&auml;ndig gelesen hast</b>. "
                       + " Bitte vermeide es, wiederholt die Leertaste zu dr&uuml;cken, um den Satz schneller zu lesen oder mehrere W&ouml;rter auf einmal zu lesen. Das widerspricht dem ganzen Sinn des Experiments und verf&auml;lscht die Daten. Danke!"
                       
                      )
               .settings.css("font-size", "20px")
               ,
               newText("bio_example", "e.g, <i>'_______ __________ _______ _____'</i>")
               .settings.css("font-size", "15px")
               .settings.css("font-family","courier")
               ,
               newText("bio_example1", "e.g, <i>'Elegant __________ _______ _____'</i>")
               .settings.css("font-size", "15px")
               .settings.css("font-family","courier")
               ,
               newText("bio_example2", "e.g, <i>'Elegant angezogen _______ _____  '</i>")
               .settings.css("font-size", "15px")
               .settings.css("font-family","courier")
               ,
               newText("bio_example3", "e.g, <i>'Elegant angezogen erkl&auml;rt _____ '</i>")
               .settings.css("font-size", "15px")
               .settings.css("font-family","courier")
               ,
               newText("bio_example4", "e.g, <i>'Elegant angezogen erkl&auml;rt Petra:'</i>")
               .settings.css("font-size", "15px")
               .settings.css("font-family","courier")
               
               ,
               
               newCanvas("instruccanvas",900, 450)
               .settings.add(20,0, getText("instructions_a"))
               .settings.add(30,420, getText("bio_example"))
               .settings.center()
               .print()   
               ,
               newKey("con"," ")
               .wait()
               ,
               getCanvas("instruccanvas")
               .remove( getText("bio_example"))
               .settings.add(30,420, getText("bio_example1"))
               .settings.center()
               .print()  
               ,
               newKey("con1"," ")
               .wait()
               ,
               
               getCanvas("instruccanvas")
               .remove(getText("bio_example1"))
               .settings.add(30,420, getText("bio_example2"))
               .settings.center()
               ,
               newKey("con2"," ")
               .wait()
               ,
               getCanvas("instruccanvas")
               .remove(getText("bio_example2"))
               .settings.add(30,420, getText("bio_example3"))
               .settings.center()
               
               ,
               newKey("con3"," ")
               .wait()
               ,
               getCanvas("instruccanvas")
               .remove(getText("bio_example3"))
               .settings.add(30,340, getText("bio_example4"))
               .settings.center()

               ,
               newKey("instr_a", " ")
               .wait()
               ,
               getCanvas("instruccanvas")
               .remove(getText("instructions_a"))
               ,
               newText("instructions_b", "(2) Als N&auml;chstes bekommst Du ein <b>Bild</b> zu sehen, das f&uuml;r ein paar Sekunden auf dem Bildschirm bleibt. Deine Aufgabe ist es, <b>das Bild zu betrachten und zu &uuml;berlegen, wie es in den Kontext des vorherigen und des n&auml;chsten Satzes passen k&ouml;nnte</b>."
                       +"<p>(3) Du wirst einen <b> zweiten Satz </b> sehen, der eine Handlung beschreibt."
                       +"<p>Lies Dir den Satz durch, indem Du die Leertaste dr&uuml;ckst, um jeden Satzteil aufzudecken. Die Vorgehensweise ist die gleiche wie zuvor. Wenn Du das Ende des Satzes erreicht hast, dr&uuml;cke erneut die Leertaste." )
               .settings.css("font-size", "20px")
               .settings.center()
               ,
               newText("example",  "<p><i>'___ ____ _____ _____________ ____________'</i>")
               .settings.css("font-size", "15px")
               .settings.css("font-family","courier")
               ,
               newText("example1",  "<p><i>'Ich ____ _____ _____________ ____________'</i>")
               .settings.css("font-size", "15px")
               .settings.css("font-family","courier")
               ,
               newText("example2", "<p><i>'Ich esse _____ _____________ ____________'</i>")
               .settings.css("font-size", "15px")
               .settings.css("font-family","courier")
               ,
               newText("example3", "<p><i>'Ich esse jetzt _____________ ____________'</i>")
               .settings.css("font-size", "15px")
               .settings.css("font-family","courier")
               ,
               newText("example4", "<p><i>'Ich esse jetzt meinen Joghurt ____________'</i>")
               .settings.css("font-size", "15px")
               .settings.css("font-family","courier")
               ,
               newText("example5", "<p><i>'Ich esse jetzt meinen Joghurt in der K&uuml;che.'</i>")
               .settings.css("font-size", "15px")
               .settings.css("font-family","courier")
               ,
               getCanvas("instruccanvas")
               .settings.add(20,0, getText("instructions_b"))
               .settings.add(70,360, getText("example"))
               .print()  
               ,
               newKey("ex"," ")
               .wait()
               ,
               getCanvas("instruccanvas")
               .remove(getText("example"))
               .settings.add(70,360, getText("example1"))
               ,
               newKey("ex1"," ")
               .wait()
               ,
               getCanvas("instruccanvas")
               .remove(getText("example1"))
               .settings.add(70,360, getText("example2"))
               .print()  
               ,                
               newKey("ex2"," ")
               .wait()
               ,
               getCanvas("instruccanvas")
               .remove(getText("example2"))
               .settings.add(70,360, getText("example3"))
               .print()  
               ,                
               newKey("ex3"," ")
               .wait()
               ,
               getCanvas("instruccanvas")
               .remove(getText("example3"))
               .settings.add(70,360, getText("example4"))
               .print()  
               ,
               
               newKey("ex4"," ")
               .wait()
               ,
               getCanvas("instruccanvas")
               .remove(getText("example4"))
               .settings.add(70,360, getText("example5"))
               .print()  
               ,                
               
               newKey("instr_c", " ")
               .wait()
               ,
              getCanvas("instruccanvas")
              .remove(getText("example5"))
              .remove(getText("instructions_b"))
              .remove(getText("bio_example4"))
    
               ,
               newText("last_instructions", "<p> Bitte denke daran, jeder experimentellen Aufgabe besonders viel Aufmerksamkeit zu schenken. <b><u>Nach jedem experimentellen Versuch wirst du aufgefordert Ged&auml;chtnischecks durchzuf&uuml;hren.</b></u>"
               + "<p>Die <u>Ged&auml;chtnischecks</u> bestehen darin zu <u>entscheiden, ob das angezeigte Bild dem zweiten/zuletzt gelesenen Satz inhaltlich passt (wurde das angezeigte Objekt fr&uuml;her erw&auml;hnt oder nicht</u>? Diese beiden Elemente, die f&uuml;r Ged&auml;chtnischecks relevant sind, werden in der &Uuml;bungsrunde rot hervorgehoben."
    
    
               + "<p><b>WICHTIG!</b> W&auml;hrend des gesamtes Experimentes, bitten wir Dich, <b> den linken Zeigefinger auf die F - Taste</b> und <b>den rechten Zeigefinger auf die J-Taste</b> zu setzen."
               + "W&auml;hrend Dein rechter und linker Zeigefinger auf den F- und J-Tasten liegen, <b> verwende bitte immer Deinen rechten (wenn Du rechtsh&auml;ndig bist) oder linken Daumen (wenn Du linksh&auml;ndig bist) f&uuml;r die Leseaufgabe</b>."
               + "<br><br><x-large>Dr&uuml;cke die <b>Leertaste</b> um die <b>&Uuml;bungsrunde</b> zu starten.</x-large>")
                .settings.css("font-size", "23px")
                                          .settings.css("font-family","times")
                                          .print("center at 50%", "middle at 50%")
               ,
               getCanvas("instruccanvas")
               .settings.add(20,0, getText("last_instructions"))
               ,
               newKey("begin"," ")
               .wait()
               ,
               getCanvas("instruccanvas")
               .remove(getText("last_instructions"))
               ,
               newTimer("30_before_exp", 3000)
               .start()
               .wait()
               
              );
//*******************************************************************************************************************************************************************
// PRACTICE ITEMS
//******************************************************************************************************************************************

PennController.Template( PennController.GetTable("master_spr1_long1.csv")
                         .filter("type" , "practice")
                         ,  
                         variable => ["practice",
                                      "PennController", PennController(
                                          fullscreen()
                                          
                                          ,
                                          // dots 1_1
                                          newText("start1_1", "...<span style='visibility: hidden;'>"+
                                          [...new Array(variable.context.length-3)].map(v=>'_').join('')+"</span>")
                                          .css({"font-size":"23px","font-family":"courier"})
                                          .print("center at 50%", "middle at 50%")
                                          ,
                                          // Keep the dots in place for about a second 
                                          newTimer("start1_1_timer", 600).start().wait()
                                          ,
                                          // Remove the dots
                                          getText("start1_1").remove()
                                          ,
                                          // context sentence
                                          newText ("read_ctxt","Lies bitte den ersten Satz und dr&uuml;cke die Leertaste um fortzufahren")
                                          .css({"font-size":"15px","font-family":"times new roman"})
                                          .center()
                                          .color("red")
                                          .print("center at 50%", "middle at 46%")
                                          ,
                                          // context sentence in SPR
                                          ...cumulative_ctxt(variable.context, "remove")
                                          ,
                                          getText("read_ctxt").remove()
                                          ,
                                          // Adding the picture after the context sentence
                                          // adding dots at the beginning of the trial 
                                          newText("start", "<b>+</b>")
                                          .settings.center("font-size", "55px")
                                          .print("center at 50%", "middle at 50%")
                                          ,
                                          // Keep the dots there for half a second
                                          newTimer("start", 600)
                                          .start()
                                          .wait()
                                          ,
                                          // Remove the dots
                                          getText("start")
                                          .remove()
                                          ,

                                          defaultImage
                                          .size(450,450)
                                          //Picture

                                          ,

                                          defaultText
                                          .settings.css("font-family","courier")
                                         
                                          ,
                                          newImage("picture1", variable.picture1).css("border", "solid 3px red").print("center at 50%", "middle at 50%")
                                          ,
                                          newTimer("lookatpic_prac", 3000)
                                          .start()
                                          .wait()
                                          ,
                                          getImage("picture1").remove()
                                          ,
                                          newTimer("start", 600)
                                          .start()
                                          .wait()

                                           ,
                                          // context sentence
                                          newText ("read_crit","<i>Lies bitte den zweiten Satz und dr&uuml;cke die Leertaste um fortzufahren</i>")
                                          .settings.css("font-size", "15px")
                                          .settings.center()
                                          .settings.css("font-family","times new roman")
                                          .settings.color("red")
                                          .print("center at 50%", "middle at 46%")
                                          ,
                                           // dots 1_2
                                          newText("start1_2", "...<span style='visibility: hidden;'>"+
                                          [...new Array(variable.critical.length-3)].map(v=>'_').join('')+"</span>")
                                          .css({"font-size":"23px","font-family":"courier"})
                                          .print("center at 50%", "middle at 50%")
                                          ,
                                          // Keep the dots in place for about a second 
                                          newTimer("start1_2_timer", 600).start().wait()
            
                                          ,
                                          // Remove the dots
                                          getText("start1_2")
                                          .remove()
                                              
                                          ,
                                          //critical sentence
                                          ...cumulative_crit_practice(variable.critical, "remove")
                                         
                                          ,
                                          getText("read_crit").remove()
                                          ,
                                      // Introducing the post sentence comprehension task
                                     
                                      newText ("rating_instru", variable.sentence + "<br>")
                                      .settings.css("font-size", "23px")
                                      .settings.css("font-family","courier")
                                      .print("center at 50%", "middle at 50%")
                                      , 
                                      newText ("rating_instru2", "<p><p>Die <b>'F' Taste = 'Ja'</b>, die <b>'J' Taste = 'Nein'</b>")
                                      .settings.css("font-size", "23px")
                                      .settings.css("font-family","courier")
                                      .settings.color("black")
                                      .print("center at 50%", "middle at 52%")
                                      ,
                                      newText("F_text", "F")
                                      .settings.css("font-size", "20px")
                                      .print("center at 30%", "middle at 60%")
                                      ,
                                      newText("yes_text", "<i>(Ja)</i>")
                                      .settings.css("font-size", "20px")
                                      .print("center at 30%", "middle at 64%")
                                      .settings.color("green")
                                      ,
                                      newText("J_text", "J")
                                      .settings.css("font-size", "20px")
                                      .settings.center()
                                      .print("center at 65%", "middle at 60%")
                                      ,
                                      newText("no_text", "<i>(Nein)")
                                      .settings.css("font-size", "20px")
                                      .settings.center()
                                      .print("center at 65%", "middle at 64%") // J-version
                                      .settings.color("red")
                                      ,
                                      newKey("rating", "FJ")
                                      .callback( getTimer("time_out1").stop() )
                                      .log("all")  
                                      ,
                                      newTimer("time_out1", 5000)
                                      .start()
                                      .log()
                                      .wait()
                                      ,     
                                      getText("rating_instru")
                                      .remove()
                                      , 
                                      getText("rating_instru2")
                                      .remove()
                                      ,
                                      getText("F_text")
                                      .remove()
                                      ,   
                                      getText("J_text")
                                      .remove()
                                      , 
                                      getText("no_text")
                                      .remove()
                                      ,
                                      getText("yes_text")
                                      .remove()
                                      ,                                 
                                      getKey("rating")
                                      .disable()
                                      ,
                                      // create variable for rating response
                                      newVar("rating")
                                      .set(getKey("rating") )
                                      ,
                                      // check if timedout
                                      getKey("rating")
                                      .test.pressed()
                                      .failure(
                                      newText("time-out", "Hoppla! Sei bitte schneller!")
                                      .settings.css("font-size", "20px")
                                      .settings.css("font-family","courier")
                                      .settings.color("red")
                                      .settings.center()
                                      .print("40vh"))
       
                                          ,
                                          newText("continue", "<i>Dr&uuml;cke die Leertaste um fortzufahren</i>")
                                          .settings.css("font-size", "23px")
                                          .settings.css("font-family","courier")
                                          .print("center at 50%", "middle at 50%")
                                         ,
                                          newKey("Continue", " ")
                                          .wait()
                                          .log()
                                         
                                      )
                                      
                                      .log("item_number",variable.item_no)
                                      .log("item_id", variable.item_id)
                                      .log("type", variable.type)
                                      .log("condition",variable.condition)
                                      .log("social_context",variable.social_context)
                                      .log("target_register",variable.target_context)
                                      .log("register_match",variable.register_match)
                                      .log("grammatical",variable.grammatical)
                                      .log("expset", variable.expset)
                                      .log("picture1", variable.picture1)
                                      .log("correct_choice", variable.correct_answer)
                                      .log("participant_choice", getKey("rating"))                                      
                                      
                                     ]
                         
                        );


//*******************************************************************************************************************************************************************
// END of PRACTICE
//******************************************************************************************************************************************
PennController( "end_practice" ,
                
                newText("end_practice", "<p>Das ist das Ende der &Uuml;bungsphase! Das Experiment beginnt, sobald Du die Leertaste dr&uuml;ckst! </p>")
                .settings.css("font-size", "23px")
                                          .settings.css("font-family","courier")
                                          .print("center at 50%", "middle at 50%")
                ,
                
                newKey("end_pract", " ")
                .wait()
                .log()
                ,  
                
                getText("end_practice")
                .remove()
                
               )   
    
    
    
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);



//*******************************************************************************************************************************************************************
// EXPERIMENTAL TRIALS : CRITICALS + FILLERS (already pseudo-randomized) //
//******************************************************************************************************************************************


PennController.Template( PennController.GetTable("master_spr1_long1.csv")
                         .filter("type" , (/^(critical|filler)$/))
                         ,  
                         variable => ["experiment_trial",
                                      "PennController", PennController(
                                           fullscreen()
                                         ,

                                          // dots 1 experimental
                                          newText("start3", "...<span style='visibility: hidden;'>"+
                                          [...new Array(variable.context.length-3)].map(v=>'_').join('')+"</span>")
                                          .css({"font-size":"23px","font-family":"courier"})
                                          .print("center at 50%", "middle at 50%")
                                          ,
                                          // Keep the dots in place for about a second 
                                          newTimer("start3_timer", 1000).start().wait()
                                          
                                          ,
                                          // Remove the dots
                                          getText("start3")
                                          .remove()

                                          ,
                                          
                                          // context sentence in SPR
                                          ...cumulative_ctxt(variable.context, "remove")
                                        
                                          ,
                                          // Adding the picture after the context sentence
                                          // adding dots at the beginning of the trial 
                                          newText("start", "<b>+</b>")
                                          .settings.center("font-size", "55px")
                                          .print("center at 50%", "middle at 50%").log()
                                          ,
                                          // Keep the dots there for half a second
                                          newTimer("start", 1000)
                                          .start()
                                          .wait()
                                          ,
                                          // Remove the dots
                                          getText("start")
                                          .remove()
                                          ,

                                          defaultImage
                                          .size(450,450)
                                          //Picture

                                          ,

                                          defaultText
                                          .settings.css("font-family","courier")
                                         
                                          ,
                                          newImage("picture1", variable.picture1).css("border", "solid 1px black").print("center at 50%", "middle at 50%").log()
                                          ,
                                          newTimer("lookatpic_prac", 3000)
                                          .start()
                                          .wait()
                                          ,
                                          getImage("picture1").remove()
                                          ,
                                          newTimer("start", 1000)
                                          .start()
                                          .wait()
                                          ,
                                           // dots 2 experimental
                                  
                                          newText("start4", "...<span style='visibility: hidden;'>"+
                                          [...new Array(variable.critical.length-3)].map(v=>'_').join('')+"</span>")
                                          .css({"font-size":"23px","font-family":"courier"})
                                          .print("center at 50%", "middle at 50%")
                                          ,
                                          // Keep the dots in place for about a second 
                                          newTimer("start4_timer", 500).start().wait()
                                          
                                          ,
                                          // Remove the dots
                                          getText("start4")
                                          .remove()
                                              
                                          ,
                                          //critical sentence
                                          ...cumulative_crit(variable.critical, "remove")    
                                          ,
                                          // Introducing the post sentence comprehension task
                                     
                                      newText ("rating_instru", variable.sentence)
                                      .settings.css("font-size", "23px")
                                      .settings.css("font-family","courier")
                                      .print("center at 50%", "middle at 50%")
                                      //, 
                                      //newText ("rating_instru2", "<p>Die 'F' Taste = 'Ja', die 'J' Taste = 'Nein'.")
                                      //.settings.css("font-size", "23px")
                                      //.settings.css("font-family","courier")
                                      //.print("center at 50%", "middle at 22%")
                                      ,
                                      newText("F_text", "F")
                                      .settings.css("font-size", "20px")
                                      .print("center at 30%", "middle at 60%")
                                      
                                      ,
                                      newText("yes_text", "<i>(Ja)</i>")
                                      .settings.css("font-size", "20px")
                                      .print("center at 30%", "middle at 64%")
                                      .settings.color("green")
                                      ,
                                      newText("J_text", "J")
                                      .settings.css("font-size", "20px")
                                      .settings.center()
                                      .print("center at 65%", "middle at 60%")
                                
                                      ,
                                      newText("no_text", "<i>(Nein)")
                                      .settings.css("font-size", "20px")
                                      .settings.center()
                                      .print("center at 65%", "middle at 64%") // J-version
                                      .settings.color("red")
                                      ,
                                      newKey("rating", "FJ")
                                      .callback( getTimer("time_out1").stop() )
                                      .log("all")  
                                      ,
                                      newTimer("time_out1", 5000)
                                      .start()
                                      .log()
                                      .wait()
                                      ,     
                                      // clear everything
                                      getText("rating_instru")
                                      .remove()
                                      , 
                                      //getText("rating_instru2")
                                     // .remove()
                                     // ,
                                      getText("F_text")
                                      .remove()
                                      ,   
                                      getText("J_text")
                                      .remove()
                                      , 
                                      getText("no_text")
                                      .remove()
                                      ,
                                      getText("yes_text")
                                      .remove()
                                      ,                                 
                                      getKey("rating")
                                      .disable()
                                      ,
                                      // create variable for rating response
                                      newVar("rating")
                                      .set(getKey("rating") )
                                      ,
                                      // check if timedout
                                      getKey("rating")
                                      .test.pressed()
                                      .failure(
                                      newText("time-out", "Hoppla! Sei bitte schneller!")
                                      .settings.css("font-size", "20px")
                                      .settings.css("font-family","times new roman")
                                      .settings.color("red")
                                      .settings.center()
                                      .print("40vh"))
                                          ,
                                          newText("continue", "<i>Dr&uuml;cke die Leertaste um fortzufahren</i>")
                                          .settings.css("font-size", "23px")
                                          .settings.css("font-family","courier")
                                          .print("center at 50%", "middle at 50%")
                                         ,
                                          newKey("Continue", " ")
                                          .wait()
                                          .log()
                                          
                                      )
                                      
                                      .log("item_number",variable.item_no)
                                      .log("item_id", variable.item_id)
                                      .log("type", variable.type)
                                      .log("condition",variable.condition)
                                      .log("social_context",variable.social_context)
                                      .log("target_register",variable.target_context)
                                      .log("register_match",variable.register_match)
                                      .log("grammatical",variable.grammatical)
                                      .log("expset", variable.expset)
                                      .log("picture1", variable.picture1)
                                      .log("correct_choice", variable.correct_answer)
                                      .log("participant_choice", getKey("rating"))
                                      .log("choice", getKey("rating"))
                                      
                                      
                                      
                                      
                                     ]
                         
                        );



//*******************************************************************************************************************************************************************
// TAKE A BREAK - 1/3
//******************************************************************************************************************************************
PennController( "break1" ,
                
                newText("break_text", "<p><b>Zeit f&uuml;r die erste Pause!</b><br><p>Sie dauert etwa 1 Minute, aber wenn Du sie &uuml;berspringen oder fr&uuml;her beenden m&ouml;chtest, <b>dr&uuml;cke auf die Leertaste</b></p>Es wird empfohlen, diese Zeit zu nutzen, um Dich ein wenig zu entspannen. Wir bedanken uns bei Dir f&uuml;r Deine Aufmerksamkeit und Geduld!")
                .settings.css("font-size", "20px")
                .settings.center()
                .print()    
                ,
                
                newTimer("break_timer", 60000)
                .start()                
                ,
                newKey("continue_exp", " ")                 
                .callback( getTimer("break_timer").stop() )   
                ,
                getTimer("break_timer")
                .wait("first")
                ,
                getText("break_text")
                .remove()                
                ,
                
                getKey("continue_exp")
                .remove()   
                ,
                
                newTimer(5000)
                .start()
                .wait()             
               )   
    
    .log("type", "break")
    
    
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);


//*******************************************************************************************************************************************************************
// TAKE A BREAK - 2/3
//******************************************************************************************************************************************
PennController( "break2" ,
                
                newText("break_text", "<p><b>Zeit f&uuml;r die zweite Pause!</b><br><p>Sie dauert etwa 1 Minute, aber wenn Du sie &uuml;berspringen oder fr&uuml;her beenden m&ouml;chtest, <b>dr&uuml;cke auf die Leertaste</b></p>Es wird empfohlen, diese Zeit zu nutzen, um Dich ein wenig zu entspannen. Wir bedanken uns bei Dir f&uuml;r Deine Aufmerksamkeit und Geduld!")
                .settings.css("font-size", "20px")
                .settings.center()
                .print()    
                ,
                
                newTimer("break_timer", 60000)
                .start()                
                ,
                newKey("continue_exp", " ")                 
                .callback( getTimer("break_timer").stop() )   
                ,
                getTimer("break_timer")
                .wait("first")
                ,
                getText("break_text")
                .remove()                
                ,
                
                getKey("continue_exp")
                .remove()   
              
                ,
                newTimer(5000)
                .start()
                .wait()             
               )   
    
    .log("type", "break")
    
    
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);


//*******************************************************************************************************************************************************************
// TAKE A BREAK - 3/3
//******************************************************************************************************************************************
PennController( "break3" ,
                
                newText("break_text", "<p><b>Zeit f&uuml;r die letzte Pause!</b><br><p>Sie dauert etwa 1 Minute, aber wenn Du sie &uuml;berspringen oder fr&uuml;her beenden m&ouml;chtest, <b>dr&uuml;cke auf die Leertaste</b></p>Es wird empfohlen, diese Zeit zu nutzen, um Dich ein wenig zu entspannen. Wir bedanken uns bei Dir f&uuml;r Deine Aufmerksamkeit und Geduld!")
                .settings.css("font-size", "20px")
                .settings.center()
                .print()    
                ,
                
                newTimer("break_timer", 60000)
                .start()                
                ,
                newKey("continue_exp", " ")                 
                .callback( getTimer("break_timer").stop() )   
                ,
                getTimer("break_timer")
                .wait("first")
                ,
                getText("break_text")
                .remove()                
                ,
                
                getKey("continue_exp")
                .remove()   
                
                ,
                newTimer(5000)
                .start()
                .wait()             
               )   
    
    .log("type", "break")
    
    
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);

//*******************************************************************************************************************************************************************
// End of Experiment
//******************************************************************************************************************************************
PennController( "end_exp" ,
                newText("end_exp","<p> Das ist das Ende der Experimentphase! Als n&auml;chstes kommt einen kurzen Post-Experiment Fragebogen. </p>")
                .settings.css("font-family","times new roman") .settings.css("font-size", "23px")
                .settings.center()
                .print("center at 50%", "middle at 50%")
                
                ,
                
                newKey("end_exp", " ")
                .wait()
                .log()
                ,  
                
                getText("end_exp")
                .remove()
                
               )   
    
    
    
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);
//*******************************************************************************************************************************************************************
// POST EXPERIMENT QUESTIONNAIRE
//******************************************************************************************************************************************

PennController("post-ques",
               newText("post-instruc", "Wir m&ouml;chten Dich darum bitten, noch ein Paar Fragen zum Experiment zu beantworten. <br>Deine Antworten sollten kurz, aber informativ sein.<p><p>")
               .settings.center()
               .settings.bold()
               .print()
               ,
               // Q1
               newText("notice", "1. Gibt es etwas, das Dir w&auml;hrend des Experimentes aufgefallen ist? (Irgendwelches Muster/Regelm&auml;&szlig;igkeiten/etwas Seltsames oder &Uuml;berrachendes)")
               .settings.center()
               .print()
               
               ,
               newTextInput("notice")
               .size(600,50)
               .settings.center()
               .print()
               .log()
               ,
               newText("blank", "<p>")
               .settings.center()
               .print()
               ,
               newButton("next1", "N&auml;chste Frage")
               .settings.center()
               .print()
               .wait()
               ,
               getButton("next1")
               .remove()
               ,
               // Q2
               newText("about", "2. K&ouml;nntest Du erraten, worum es bei dem Experiment ging?")
               .settings.center()
               .print()
               ,
               newTextInput("about")
               .size(600, 50)
               .settings.center()
               .print()
               .log()
               ,   
               newText("blank", "<p>")
               .settings.center()
               .print()
               ,            
               newButton("next2", "N&auml;chste Frage")
               .settings.center()
               .print()
               .wait()
               ,
               getButton("next2")
               .remove()
               ,
               //Q3
               newText("hard", "3. Gab es etwas besonders Schwieriges an dem Experiment?")
               .settings.center()
               .print()
               ,
               newTextInput("hard","")
               .size(600, 50)
               .settings.center()
               .print()
               .log()
               ,     
               newText("blank", "<p>")
               .print()
               ,            
               newButton("next3", "N&auml;chste Frage")
               .settings.center()
               .print()
               .wait()
               ,
               getButton("next3")
               .remove()
               ,
               // Q4
               newText("strategy", "4. Hast Du w&auml;hrend des Experiments irgendwelche Strategien entwickelt? Wenn ja, bitte erl&auml;utern.")
               .settings.center()
               .print()
               ,
               newTextInput("strategy","")
               .size(600, 50)
               .settings.center()
               .print()
               .log()
               ,   
               newText("blank", "<p>")
               .print()
               ,              
               newButton("next4", "Fertig!")
               .settings.center()
               .print()
               .wait()
               ,
               // create Vars
               newVar("notice") // this will create a new variable "ID"; MUST be after the 'Start' button click
               .settings.global()
               .set(getTextInput("notice") )
               ,
               newVar("about") // this will create a new variable "ID"; MUST be after the 'Start' button click
               .settings.global()
               .set(getTextInput("about") )
               ,
               newVar("hard") // this will create a new variable "ID"; MUST be after the 'Start' button click
               .settings.global()
               .set(getTextInput("hard") )
               ,
               newVar("strategy") // this will create a new variable "ID"; MUST be after the 'Start' button click
               .settings.global()
               .set(getTextInput("strategy") )
              )
    
    //*******************************************************************************************************************************************************************
    // SEND THE RESULTS TO THE SERVER
    //******************************************************************************************************************************************
    
    PennController.SendResults( "send" ); // send results to the server before participants see the actual end of the experiment


//*******************************************************************************************************************************************************************
// THKS & BYE
//******************************************************************************************************************************************                      

PennController.Template(PennController.GetTable("validation.csv")// change this line for the appropriate experimental list
                        
                        
                        ,
                        variable => PennController( "final"
                                                    ,
                                                    exitFullscreen()
                                                    ,                           
                                                    newText("<p> Das ist das Ende des Experimentes. Vielen Dank f&uuml;r Deine Teilnahme! </p>")
                                                    .settings.css("font-family","times new roman") .settings.css("font-size", "18px")
                                                    .settings.center()
                                                    .print()
                                                    ,
                                                    newText ("<p>Bitte kopiere den folgenden Code und gebe ihn in dem Clickworker-Formular ein, um Deine Teilnahme zu best&auml;tigen und die Bezahlung zu erhalten: </p>")
                                                    .settings.css("font-family","times new roman") .settings.css("font-size", "18px")
                                                    .settings.center()
                                                    .print()
                                                    ,
                                                    newText ("<p>Wichtig: Behandle diesen Code vertraulich und gebe ihn nicht an einer anderen Person weiter! </p>")
                                                    .settings.css("font-family","times new roman") .settings.css("font-size", "18px")
                                                    .settings.center()
                                                    .print()
                                                    ,
                                                    newText ("<p><b>"+"MGK1BL1"+"</b></p>")
                                                    .settings.css("font-family","times new roman") .settings.css("font-size", "30px")
                                                    .settings.center()
                                                    .settings.log("all")
                                                    .print()
                                                    ,
                                                    
                                                    newButton("void")
                                                    .wait()                            
                                                    
                                                   )   
                        .setOption("countsForProgressBar", false)    //overrides some default settings, such as countsForProgressBar
                        .setOption("hideProgressBar", true)
                       );





