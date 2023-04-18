# Vino!

_Un projet collaboratif de fin d'étude en programmation et conception web d'une application de gestion de cellier utilisant Laravel et React par_

-   nicolasgodineau
-   rizo32
-   ShinigamiXYZ
-   88elodie

---

## Étapes:

1. **Déclenchement serveur laravel**

    - Navigation vers la source du projet Laravel

    ```
    php artisan serve
    ```

1. **Déclenchement serveur React**
    - Navigation vers le répertoire 'react'
    ```
    npm run dev
    ```
    - Ouverture du port 3000
    ```
    http://localhost:3000/
    ```

## Création de votre projet

- "Forker" le dépôt rizo32/vino, assurez-vous de garder la case "Fork only dev branch" cochée.
- Clonez-le sur votre dépôt local.
- Assurez-vous de travailler sur la branche "dev" (de VOTRE fork!!) en utilisant la commande "git checkout dev".
- `git remote add upstream https://github.com/rizo32/vino.git` pour créer une liaison 'upstream' avec le repertoire maitre (ie commun)

## Fork <- Maitre

- À chaque nouvelle session, ou lorsque quelqu'un d'autre effectue un merge (pull request):
```
`git fetch upstream`
```
pour aller chercher le code, puis pour synchroniser:
```
`git merge upstream/dev`
```

(sinon, directement sur github faire un pull request fork <- maitre et faire git pull à partir du local)

## Maitre <- Fork

- Tout au long de la journée, effectuez plusieurs commits
- Quelques fois par jour (eg chaque 2 heures), quand le code est stable, faire un git pull et pull request (via github) vers la branche dev du repo maitre
