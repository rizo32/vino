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

<!-- YG -->

## procédures git initial

-   "forker" le dépôt rizo32/vino, assurez-vous de garder la case "Fork only dev branch" cochée.
    -   Ensuite, clonez-le sur votre dépôt local.
-   Assurez-vous de travailler sur la branche "dev" en utilisant la commande "git checkout dev".

## procédures git quotidienne ( a revoir )

-   Vérifiez votre fork GitHub pour valider que vous êtes à jour avec le dépôt principal (rizo32/vino).
    -   Si ce n'est pas le cas, synchronisez.
-   allez sur votre dépôt local et effectuez un "pull" pour vous assurer que tout est à jour.
-   Tout au long de la journée, effectuez plusieurs commits
-   puis à la fin de la journée, poussez-les sur votre fork et créez une demande de fusion (pull request) de votre fork vers rizo32/vino.

<!-- </YG> -->

## Procédures pour récupérer le travail dans le repo de Maitre (gab)

Pour la 1er fois du projet faire `git remote add upstream https://github.com/rizo32/vino.git`

Puis a faire tous les jours:
Dans le terminal faire `git fetch upstream`, puis `git merge upstream/dev`
