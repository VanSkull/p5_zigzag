// Fonction de la plateforme (Cellule)

function Cellule(x, y, w) {										// Paramètres d'une cellule
	this.x = x;
	this.y = y;
	this.w = w;
	this.color = color(255, 255, 255);
	this.hit = false;
	this.valeur = 0;
	this.poly = [];			// Stockage des vecteurs (utile pour la détection de collision)
}

Cellule.prototype.display = function() {						// Fonction d'affichage de la cellule
	this.poly[0] = createVector(this.x - this.w, this.y); 
	this.poly[1] = createVector(this.x, this.y - this.w); 
	this.poly[2] = createVector(this.x + (this.w / 2), this.y - (this.w / 2)); 
	this.poly[3] = createVector(this.x - (this.w / 2), this.y + (this.w / 2));
	this.poly[4] = createVector(this.x, this.y + this.w); 
	this.poly[5] = createVector(this.x + this.w, this.y);
	this.poly[6] = createVector(this.x + (this.w / 2), this.y - (this.w / 2)); 
	this.poly[7] = createVector(this.x - (this.w / 2), this.y + (this.w / 2));

	fill(this.color);
	
	beginShape();
	for(var i = 0; i < this.poly.length; i++){
		vertex(this.poly[i].x, this.poly[i].y);
	}
	endShape(CLOSE);
}

Cellule.prototype.collide = function(obj){						// Fonction de détection de la collision entre la cellule et la boule 
	this.hit = collideCirclePoly(obj.xb, obj.yb, obj.r, this.poly);

	if(this.hit){
		this.valeur = 1;
	} else {
		this.valeur = 0;
	}
}

Cellule.prototype.move = function(t) {							// Fonction de déplacement de la cellule
	this.y = this.y + t;
}

Cellule.prototype.positionX = function() {						// Fonction retournant la position X de la cellule 
	return this.x;
}

Cellule.prototype.positionY = function() {						// Fonction retournant la position Y de la cellule
	return this.y;
}

Cellule.prototype.valor = function() {							// Fonction retournant si la collision est détectée ou non
	return this.valeur;
}

Cellule.prototype.couleur = function(new_color) {				// Fonction pour définir une nouvelle couleur
	this.color = new_color;
}

// Fin de la fonction de la plateforme (Cellule)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Fonction des diamants (Bonus)

function Bonus(x, y, num) {										// Paramètres d'un bonus
	this.x = x;
	this.y = y;
	this.w = 30;
	this.num = num;
	this.color = color(138,43,226);
	this.hit = false;
	this.point = 0;
}

Bonus.prototype.collide = function(obj) {						// Fonction de détection de la collision entre le bonus et la boule
	this.hit = collideRectCircle(this.x, this.y, this.w, this.w, obj.xb, obj.yb, obj.r); 

	if(this.hit){
		this.point = this.point + 2;
	}
}

Bonus.prototype.display = function() {							// Fonction d'affichage du bonus
	fill(this.color);
	rect(this.x, this.y, this.w, this.w);
	push();
	stroke(0);
	strokeWeight(2)
	line(this.x - (this.w * 0.3), this.y - (this.w * 0.3), this.x + (this.w * 0.3), this.y + (this.w * 0.3));
	line(this.x - (this.w * 0.3), this.y + (this.w * 0.3), this.x + (this.w * 0.3), this.y - (this.w * 0.3));
	pop();
}

Bonus.prototype.move = function (t) {							// Fonction de déplacement du bonus 
	this.y = this.y + t;
}

Bonus.prototype.numero = function() {							// Fonction retournant le numéro de position du bonus
	return this.num;
}

Bonus.prototype.positionY = function() {						// Fonction retournant la position Y du bonus
	return this.y;
}

Bonus.prototype.veref = function() {							// Fonction retournant si la collistion est détectée ou non 
	return this.hit;
}

Bonus.prototype.score = function() {							// Fonction retournant le score stocké dans le bonus
	return this.point;
}

// Fin de la fonction des diamants (Bonus)