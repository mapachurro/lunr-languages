(function (lunr) {
    lunr.tl = function () {
      this.pipeline.reset();
      this.pipeline.add(
        lunr.tl.stemmer,
        lunr.tl.stopWordFilter
      );
    };
  
    lunr.tl.stemmer = function (token) {
      // Prefix, infix, and suffix sets, drawn from crlwingen's TagalogStemmerPython repo -- MIT license
      var PREFIX_SET = [
        'nakikipag', 'pakikipag', 'pinakama', 'pagpapa', 'pinagka', 'panganga',
        'makapag', 'nakapag', 'tagapag', 'makipag', 'nakipag', 'tigapag',
        'pakiki', 'magpa', 'napaka', 'pinaka', 'ipinag', 'pagka', 'pinag', 
        'mapag', 'mapa', 'taga', 'ipag', 'tiga', 'pala', 'pina', 'pang', 
        'naka', 'nang', 'mang', 'sing', 'ipa', 'pam', 'pan', 'pag', 'tag', 
        'mai', 'mag', 'nam', 'nag', 'man', 'may', 'ma', 'na', 'ni', 'pa', 
        'ka', 'um', 'in', 'i'
      ];
  
      var INFIX_SET = ['um', 'in'];
  
      var SUFFIX_SET = [
        'syon', 'dor', 'ita', 'han', 'hin', 'ing', 'ang', 'ng', 'an', 'in', 'g'
      ];
  
      // Normalize token to lowercase
      token = token.toLowerCase();
  
      // Handle duplication (e.g., "araw-araw" becomes "araw")
      if (token.includes('-')) {
        let parts = token.split('-');
        if (parts[0] === parts[1]) {
          token = parts[0];
        }
      }
  
      // Strip prefixes
      for (var i = 0; i < PREFIX_SET.length; i++) {
        var prefix = PREFIX_SET[i];
        if (token.startsWith(prefix) && token.length > prefix.length + 2) {
          token = token.slice(prefix.length);
          break;
        }
      }
  
      // Strip infixes
      for (var i = 0; i < INFIX_SET.length; i++) {
        var infix = INFIX_SET[i];
        if (token.includes(infix)) {
          token = token.replace(infix, '');
          break;
        }
      }
  
      // Strip suffixes
      for (var i = 0; i < SUFFIX_SET.length; i++) {
        var suffix = SUFFIX_SET[i];
        if (token.endsWith(suffix) && token.length > suffix.length + 2) {
          token = token.slice(0, -suffix.length);
          break;
        }
      }
  
      return token;
    };
  
    lunr.Pipeline.registerFunction(lunr.tl.stemmer, 'stemmer-tl');
  
    // Stop words, drawn from stopwords-iso 
    lunr.tl.stopWordFilter = lunr.generateStopWordFilter([
      "akin", "aking", "ako", "alin", "am", "amin", "aming", "ang", "ano", 
      "anumang", "apat", "at", "atin", "ating", "ay", "bababa", "bago", 
      "bakit", "bawat", "bilang", "dahil", "dalawa", "dapat", "din", "dito", 
      "doon", "gagawin", "gayunman", "ginagawa", "ginawa", "ginawang", "gumawa", 
      "gusto", "habang", "hanggang", "hindi", "huwag", "iba", "ibaba", 
      "ibabaw", "ibig", "ikaw", "ilagay", "ilalim", "ilan", "inyong", "isa", 
      "isang", "itaas", "ito", "iyo", "iyon", "iyong", "ka", "kahit", "kailangan", 
      "kailanman", "kami", "kanila", "kanilang", "kanino", "kanya", "kanyang", 
      "kapag", "kapwa", "karamihan", "katiyakan", "katulad", "kaya", "kaysa", 
      "ko", "kong", "kulang", "kumuha", "kung", "laban", "lahat", "lamang", 
      "likod", "lima", "maaari", "maaaring", "maging", "mahusay", "makita", 
      "marami", "marapat", "masyado", "may", "mayroon", "mga", "minsan", "mismo", 
      "mula", "muli", "na", "nabanggit", "naging", "nagkaroon", "nais", 
      "nakita", "namin", "napaka", "narito", "nasaan", "ng", "ngayon", "ni", 
      "nila", "nilang", "nito", "niya", "niyang", "noon", "o", "pa", "paano", 
      "pababa", "paggawa", "pagitan", "pagkakaroon", "pagkatapos", "palabas", 
      "pamamagitan", "panahon", "pangalawa", "para", "paraan", "pareho", "pataas", 
      "pero", "pumunta", "pumupunta", "sa", "saan", "sabi", "sabihin", "sarili", 
      "sila", "sino", "siya", "tatlo", "tayo", "tulad", "tungkol", "una", "walang"
    ]);
  
    lunr.Pipeline.registerFunction(lunr.tl.stopWordFilter, 'stopWordFilter-tl');
  
  })(lunr);
  