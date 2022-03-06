const taille = [126,225]; //hauteur largeur
const altitude = 40;
const blocs = ['#737272'/*pierre*/,'#4a3819'/*terre*/,'#104a1a'/*herbe*/,'#96e7ff'/*vide*/];
const carte = []
carte.push([]);
for(let a=1;a<taille[0]+1;a++){
	carte.push([]);
	for(let b=0;b<taille[1];b++){
		carte[a].push(3);
	}
}

function main(){
	function rdm(max){
		return Math.floor(Math.random() * Math.floor(max));
	}

	function remplir(y,x){
		let a = y-1;
		let possible = [4,5];
		let tailleT = possible[rdm(2)];
		while(a>y-tailleT-1 && a > 0){ // tailleT blocs terre
			carre(a,x,1);
			a--;
		}

		let b = y-tailleT-1;
		while(b > 0){ // blocs pierre
			carre(b,x,0);
			b--;
		}
	}

	function carre(y,x,bloc){
		carte[y][x] = bloc;
		document.getElementById('y'+y.toString()+'x'+x.toString()).style.backgroundColor = blocs[bloc];
	}
	let relief = 1;
	let pos = altitude;
	let x = 1;
	carre(altitude,0,2);
	remplir(altitude,0);
	while(x < taille[1]){
		if(relief < 5){ // minimum long de 3
			carre(pos,x,2);
			remplir(pos,x);
			relief++;
		} else if(rdm(15) > relief){ // tant que rdm plus grand on bouge pas
			carre(pos,x,2);
			remplir(pos,x);
			relief++;
		} else if(rdm(2) == 0){ // sinon voit si augmente ou baisse
			if(pos-1 > 0){
				pos--;
				relief = 1;
			}
			carre(pos,x,2);
			remplir(pos,x);
		} else{
			if(pos+1 < taille[1]+1){
				pos++;
				relief = 1;
			}
			carre(pos,x,2);
			remplir(pos,x);
		}
		x++;
	}
}

function init(){
	let largeurC = Math.floor(window.innerWidth/taille[1]);
	let hauteurC = Math.floor(window.innerHeight/taille[0]);
	let style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = '.carre {width:'+largeurC.toString()+'px;height:'+hauteurC.toString()+'px;}';
	document.getElementsByTagName('head')[0].appendChild(style);

	let mainDoc = document.getElementById('main');
	for(let a=0;a<taille[0];a++){
		let ligne = document.createElement('div');
		ligne.classList.add('ligne');
		mainDoc.appendChild(ligne);
		for(let b=0;b<taille[1];b++){
			let carrE = document.createElement('div');
			carrE.classList.add('carre');
			carrE.id = 'y'+(taille[0]-a).toString()+'x'+b.toString();
			ligne.appendChild(carrE);
		}
	}
	main();
}