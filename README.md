# Projekt Kanban 
- logowanie jest jedynie useStatem na potrzeby projektu, możliwa późniejsza zmiana na logownie z gitHub'em

## Przed uruchomieniem nalezy pobrac pakiet
    npm i
## Przy uruchomieniu domyślnie otwiera się port 5000 należy go zmienić na 5173
https://kanbanreact-0v44--(5000->5173)--d4eba4a9.local-corp.webcontainer.io
- Logowanie zaqpisuje się przy odswieżeniu strony.
## Strona podzielona jest na:
### Navbar 
    Element navbar zawiera: 
- Odnośnik w nazwie do strony głównej
- Odnośnik Home przekierowywujący na stronę główną
- Guzik do zmiany motywu na jasny/ciemnt
- Odnośnik do loginu
    - jeżeli użytkownik jest zalogowany rownież odnośnik do profilu
### Home
    jest stroną głółwną guzik get started będzie przekierowywać do loginu gitHub
### Profile
    W stronie profile znajduje się:
- Sidebar
    - odnosnik do projektów
    - odnośnik do board
- Projects
    - Wyświetla lokalne projekty.
    - kliknięcie guziku download pobiera plik csv
    - klikniecie na całą płytkę projektu przenośi do wybranego projektu i zapisuje ostatnio otwarty plik
        - ostatnio otwarty plik jest otwierany domyślnie przy kliknięciu projects (np Board -> Home -> Profile)
    - kliknięcie na guzik plus otwiera prompt i po uzupełnieniu nazwy tworzy nowy plik z domyślną strukturą
- Board 
    - wyświetla ostatnio otwarty plik bądź ten wybrany z zakładki Projects
    - na stronie znajdują się (inputy działają również po kliknięciu enter):
        - nagłówek z nazwą projektu 
        - input z guzikiem tworzący nową kolumnę
        - kolumny wczytane z pliku csv posiadające funkcje drag & drop pozwalające zmieniać ich kolejność
            - kliknięcie na nazwe kolumny pozwala na zmiane jej nazwy
            - guzik z ikoną śmietnika pozwalający usunąć kolumnę wraz z jej zawartością
            - input wraz z buttonem pozwalający dodać nowy task
            - taski w każdej kolumnie również będące elementami drag & drop [można je również przenosić między kolumnami]
            - guzik save zapisujący aktualny stan do pliku csv aby zapisywać postęp zmian 
### Footer
    zawiera podpis 

    
