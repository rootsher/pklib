# pklib - JavaScript library [![Build Status](https://secure.travis-ci.org/piecioshka/pklib.png?branch=master)](http://travis-ci.org/piecioshka/pklib)

`pklib` jest wynikiem ciągłego używania z tych samych wzorców w sieci web oraz telewizorach,<br />
z dodatkiem ogromu przydatnych metod używanych na co dzień w projektach z użyciem JavaScript.<br />
Biblioteka posiada testy jednostkowe napisane zgodnie ze specyfikacją [Jasmine][1].

Przykład
========

Moduł `pklib.profiler`<br />
Plik: `src/profiler.js`

```
pklib.common.defer(function () {
    var filenames = ["test.js", "example.js"];
    pklib.file.loadjs(filenames, function (file) {
        console.log("file: " + file.src + " loaded");
    });
});
```

Budowa biblioteki
=================

Każda wersja posiada własny tag w gałęzi projektu. Dla poprawy pracy nad biblioteką został napisany skrypt w ruby,
który ma za zadanie generować kod całej biblioteki z aktualnego katalogu w jeden duży plik. <br />
Każdy tag ma w swoich żródłach już wygenerowany plik z kodem źródłowym biblioteki, ale gdy istniała by potrzeba
wygenerowanie biblioteki z aktualnych źródeł dostępnych w branch'ach plik **Rakefile**, znajduje swoje praktyczne zastosowanie.

Dokumentacja
============

Dokumentacja została wygenerowana za pomoca narzędzia [jsdoc][3].<br />
Link do dokumentacji online: [http://api.pklib.com][4].

Licencja
========

[The MIT License][2]

[1]: http://pivotal.github.io/jasmine/
[2]: http://pklib.com/licencja.html
[3]: https://github.com/jsdoc3/jsdoc
[4]: http://api.pklib.com

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/piecioshka/pklib/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

