// Fonction du joueur (Boule)

function Boule(xb, yb, r) {						// Paramètres de la boule
	this.xb = xb;
	this.yb = yb;
	this.r = r;
	this.color = color(255,0,0);
}

Boule.prototype.display = function() {			// Fonction d'affichage de la boule
	fill(this.color);
	ellipse(this.xb, this.yb, this.r, this.r);
	
	push();
	strokeWeight(5);
	point(this.xb, this.yb);
	pop();
}

Boule.prototype.move = function(txb) {			// Fonction de déplacement de la boule
	this.xb = this.xb + txb;
}

Boule.prototype.dead = function() {				// Fonction d'animation en cas de fin de partie
	this.r = this.r - 1;
	if (this.r <= 0){
		this.r = 0;
	}
}

// Fin de la fonction du joueur (Boule)