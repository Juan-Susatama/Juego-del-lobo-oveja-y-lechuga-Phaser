export class Game extends Phaser.Scene {
    constructor () {
        super({key: 'game'});
    }

    preload() {
        this.load.image('pasto', 'imagenes/pasto.png');
        this.load.image('rio', 'imagenes/rio.png');
        this.load.image('barco', 'imagenes/barco.png');
        this.load.image('slime', 'imagenes/slime.png');
        this.load.image('lobo', 'imagenes/lobo.png');
        this.load.image('oveja', 'imagenes/oveja.png');
        this.load.image('lechuga', 'imagenes/lechuga.png');
        this.load.image('separador', 'imagenes/separador.png');
        this.load.image('separador2', 'imagenes/separador2.png');
        this.load.image('gameover', 'imagenes/gameover.png');
        this.load.image('win', 'imagenes/win.png');
    }
   
    create() {

        this.physics.world.setBoundsCollision(true, true, true, true);
        this.gameoverImage = this.add.image(525, 330, 'gameover');
        this.gameoverImage.setScale(0.2);
        this.gameoverImage.visible = false;
        this.gameoverImage.depth = 2;

        this.winImage = this.add.image(525, 330, 'win');
        this.winImage.setScale(0.2);
        this.winImage.visible = false;
        this.winImage.depth = 2;
        
        this.add.sprite(400, 350, 'pasto');

        this.rio = this.physics.add.sprite(530, 330 , 'rio').setImmovable();
        this.rio.body.allowGravity = false;
        this.rio.setScale(3.37);

        this.separador = this.physics.add.sprite(322, 320 , 'separador').setImmovable();
        this.separador.body.allowGravity = false;
        this.separador.setScale(2);
        this.separador.alpha = 0;

        this.separador2 = this.physics.add.sprite(738, 320 , 'separador2').setImmovable();
        this.separador2.body.allowGravity = false;
        this.separador2.setScale(2.5);
        this.separador2.alpha = 0;

        this.barco = this.physics.add.sprite(429, 240 , 'barco');
        this.barco.body.allowGravity = false;
        this.barco.setCollideWorldBounds(true);
        this.barco.setScale(0.6);

        this.slime = this.physics.add.sprite(75, 80 , 'slime');
        this.slime.body.collideWorldBounds = true;
        this.slime.inBarco = false;
        this.slime.amarrar = false;
        this.slime.cont = 0;
        this.slime.win = '';
        this.slime.body.allowGravity = false;
        this.slime.setScale(0.12);
        this.slime.na = '';
        
        this.lobo = this.physics.add.sprite(65, 250 , 'lobo').setImmovable(true);
        this.lobo.body.allowGravity = false;
        this.lobo.setCollideWorldBounds(true);
        this.lobo.setScale(0.049);


        this.oveja = this.physics.add.sprite(65, 390 , 'oveja').setImmovable(true);
        this.oveja.body.allowGravity = false;
        this.oveja.setCollideWorldBounds(true);
        this.oveja.setScale(0.029);

        this.lechuga = this.physics.add.sprite(65, 520 , 'lechuga').setImmovable(true);
        this.lechuga.body.allowGravity = false;
        this.lechuga.setCollideWorldBounds(true);
        this.lechuga.setScale(0.19);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.barco, this.slime); 
        this.physics.add.collider(this.slime, this.rio)
        this.physics.add.collider(this.barco, this.rio);
        this.physics.add.collider(this.lobo, this.oveja);
 
    }
    update() {
        
        if(this.cursors.left.isDown){
             this.slime.setVelocityX(-200);
         }else if (this.cursors.right.isDown) {
             this.slime.setVelocityX(200);
         }else{
             this.slime.setVelocityX(0);
         }
        if (this.cursors.down.isDown) {
             this.slime.setVelocityY(200);
         }else if (this.cursors.up.isDown) {
             this.slime.setVelocityY(-200);
         }else{
             this.slime.setVelocityY(0);
         }
        
        if(this.slime.inBarco===true){
            if(this.cursors.left.isDown){
                this.barco.setVelocityX(-200);
            }else if (this.cursors.right.isDown) {
                this.barco.setVelocityX(200);
            }else{
                this.barco.setVelocityX(0);
            }
           if (this.cursors.down.isDown) {
                this.barco.setVelocityY(200);
            }else if (this.cursors.up.isDown) {
                this.barco.setVelocityY(-200);
            }else{
                this.barco.setVelocityY(0);
            }
        }
        
        if (this.physics.overlap(this.slime, this.barco) || this.physics.collide(this.separador, this.slime) || 
            this.physics.collide(this.separador2, this.slime)) {
            this.slime.y = this.barco.y;
            this.slime.x = this.barco.x;
            this.slime.depth = 2;
            this.slime.inBarco = true;
        }

        if (this.physics.collide(this.barco, this.separador)) {
            this.slime.y = this.barco.y;
            this.slime.x = 273;
            this.slime.depth = 0;
            this.slime.inBarco = false;
            this.slime.win =  this.slime.win+'p';
            if(this.slime.cont === 2){
                this.oveja.y =390;
                this.oveja.x =65;
                this.slime.amarrar = false;
                this.slime.cont = 0;
            }
            
        }

        if (this.physics.collide(this.barco, this.separador2)) {
            this.slime.y = this.barco.y;
            this.slime.x = 773;
            this.slime.depth = 0;
            this.slime.inBarco = false;
            if(this.slime.cont === 1){
                this.lobo.y = 120;  
                this.lobo.x  = 872;
                this.lobo.setImmovable(true);
                this.slime.amarrar = false;
                this.slime.cont = 0;
                this.slime.win =  this.slime.win+'l';
            }
            if(this.slime.cont === 2){
                this.oveja.setImmovable(true);
                this.oveja.y = 320;
                this.oveja.x  = 872;
                this.slime.amarrar = false;
                this.slime.cont = 0;
                this.slime.win =  this.slime.win+'o';
            }
            if(this.slime.cont === 3){
                this.lechuga.setImmovable(true);
                this.lechuga.y = 520;
                this.lechuga.x  = 872;
                this.slime.amarrar = false;
                this.slime.cont = 0;
                this.slime.win =  this.slime.win+'e';
    
            }
        }

        /**if (this.physics.collide(this.barco, this.separador)) {
            this.slime.y = this.barco.y;
            this.slime.x = 278;
            this.slime.depth = 0;
            this.slime.inBarco = false;
            this.slime.win =  this.slime.win+'p';
        }*/

        if(this.physics.collide(this.lobo, this.slime) &&  this.slime.cont === 0){
            this.lobo.setImmovable(false);
            this.lobo.y = this.slime.y;
            this.lobo.x  = this.slime.x + 60;
            this.slime.amarrar = true;
            this.slime.cont = 1;
        }

        if(this.slime.amarrar === true && this.slime.cont === 1){
            if(this.cursors.left.isDown){
                this.lobo.setVelocityX(-200);
            }else if (this.cursors.right.isDown) {
                this.lobo.setVelocityX(200);
            }else{
                this.lobo.setVelocityX(0);
            }
           if (this.cursors.down.isDown) {
                this.lobo.setVelocityY(200);
            }else if (this.cursors.up.isDown) {
                this.lobo.setVelocityY(-200);
            }else{
                this.lobo.setVelocityY(0);
            }
            
        }
       

        if(this.physics.collide(this.oveja, this.slime) && this.slime.cont === 0 ){
            this.oveja.setImmovable(false);
            this.oveja.y = this.slime.y;
            this.oveja.x  = this.slime.x + 60;
            this.slime.amarrar = true;
            this.slime.cont = 2;
        }

        if(this.slime.amarrar === true && this.slime.cont === 2){
            if(this.cursors.left.isDown){
                this.oveja.setVelocityX(-200);
            }else if (this.cursors.right.isDown) {
                this.oveja.setVelocityX(200);
            }else{
                this.oveja.setVelocityX(0);
            }
           if (this.cursors.down.isDown) {
                this.oveja.setVelocityY(200);
            }else if (this.cursors.up.isDown) {
                this.oveja.setVelocityY(-200);
            }else{
                this.oveja.setVelocityY(0);
            }
            
        }

        if(this.physics.collide(this.lechuga, this.slime) && this.slime.cont === 0 ){
            this.lechuga.setImmovable(false);
            this.lechuga.y = this.slime.y;
            this.lechuga.x  = this.slime.x + 60;
            this.slime.amarrar = true;
            this.slime.cont = 3;
        }

        if(this.slime.amarrar === true && this.slime.cont === 3){
            if(this.cursors.left.isDown){
                this.lechuga.setVelocityX(-200);
            }else if (this.cursors.right.isDown) {
                this.lechuga.setVelocityX(200);
            }else{
                this.lechuga.setVelocityX(0);
            }
           if (this.cursors.down.isDown) {
                this.lechuga.setVelocityY(200);
            }else if (this.cursors.up.isDown) {
                this.lechuga.setVelocityY(-200);
            }else{
                this.lechuga.setVelocityY(0);
            }
            
        }
        
        this.slime.vec = this.slime.win.split("");
        var i = 0;
        
        console.log(this.slime.vec);

        for (i; i<= this.slime.vec.length ; i++){
            if(this.slime.vec[i] === this.slime.vec[i+1]){
                this.slime.vec.splice(i,1);
            }
        }

        console.log(this.slime.vec);

        if(this.slime.win != ''){
            if(this.slime.vec[0] != 'o'){
                console.log('Fin del juego');
                this.gameoverImage.visible = true;
                this.scene.pause();
            }
            if(this.slime.vec.length === 2 && this.slime.vec[1] != 'p'){
                console.log('Fin del juego');
                this.gameoverImage.visible = true;
                this.scene.pause();
            }
            if((this.slime.vec.length === 3 && this.slime.vec[2] != 'l')){
                console.log('Fin del juego');
                this.gameoverImage.visible = true;
                this.scene.pause();
            }
            if((this.slime.vec.length === 4 && this.slime.vec[3] != 'p' && this.slime.cont === 2)){
                console.log('Fin del juego');
                this.gameoverImage.visible = true;
                this.scene.pause();
            }
            if((this.slime.vec.length === 5 && this.slime.vec[4] != 'e')){
                console.log('Fin del juego');
                this.gameoverImage.visible = true;
                this.scene.pause();
            }
            if((this.slime.vec.length === 6 && this.slime.vec[5] != 'p')){
                console.log('Fin del juego');
                this.gameoverImage.visible = true;
                this.scene.pause();
            }
            if((this.slime.vec.length === 7 && this.slime.vec[6] != 'o')){
                console.log('Fin del juego');
                this.gameoverImage.visible = true;
                this.scene.pause();
            }
            
            var newwin = this.slime.vec.join(); 
            console.log(newwin);
            if((newwin === 'o,p,l,p,e,p,o')){
                console.log('Fin del juego, GANASTE');
                this.winImage.visible = true;
                this.scene.pause();
            }
        }
    }
}