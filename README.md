Light Life


**Démarrage du server**

/Light Life/node server.js

**Démarrer Mysql**

sudo service mysql start

**Stopper Mysql**

sudo systemctl stop mysql

**réinitialiser mot de passe**

ALTER USER 'root'@'localhost' IDENTIFIED BY 'mkl';

**Status**

sudo service mysql status

**Connecté a Mysql**

mysql -u root -p

**listé les bases de données**

SHOW databases;

**Démarrer server nodejs**

node server.js