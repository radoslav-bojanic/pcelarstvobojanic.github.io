var title = `Pčelarstvo Bojanić`

let headGlobal = `
    <title>${title}</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
    <link rel="stylesheet" href="assets/css/main.css" />
    <link rel="icon" type="image/png" href="images/logoDark_center.png" />
`;

// Variable to use as head in every file
document.getElementById('headGlobal').innerHTML = headGlobal;

let pageFooter = `
<div class="container">
						<div class="row">
							<!-- <section class="col-3 col-6-narrower col-12-mobilep">
								<h3>Links to Stuff</h3>
								<ul class="links">
									<li><a href="#">Mattis et quis rutrum</a></li>
									<li><a href="#">Suspendisse amet varius</a></li>
									<li><a href="#">Sed et dapibus quis</a></li>
									<li><a href="#">Rutrum accumsan dolor</a></li>
									<li><a href="#">Mattis rutrum accumsan</a></li>
									<li><a href="#">Suspendisse varius nibh</a></li>
									<li><a href="#">Sed et dapibus mattis</a></li>
								</ul>
							</section>
							<section class="col-3 col-6-narrower col-12-mobilep">
								<h3>More Links to Stuff</h3>
								<ul class="links">
									<li><a href="#">Duis neque nisi dapibus</a></li>
									<li><a href="#">Sed et dapibus quis</a></li>
									<li><a href="#">Rutrum accumsan sed</a></li>
									<li><a href="#">Mattis et sed accumsan</a></li>
									<li><a href="#">Duis neque nisi sed</a></li>
									<li><a href="#">Sed et dapibus quis</a></li>
									<li><a href="#">Rutrum amet varius</a></li>
								</ul>
							</section> -->
							<section class="col-6 col-12-narrower">
								<h3>Pišite nam</h3>
								<form id="sendMessageForm">
									<div class="row gtr-50">
										<div class="col-6 col-12-mobilep">
											<input type="text" name="name" id="sendMessageName" placeholder="Ime" />
										</div>
										<div class="col-6 col-12-mobilep">
											<input type="email" name="email" id="sendMessageEmail" placeholder="Email adresa" />
										</div>
										<div class="col-12">
											<textarea name="message" id="sendMessageContent" placeholder="Poruka" rows="5"></textarea>
										</div>
										<div class="col-12">
											<ul class="actions">
												<li><input type="submit" class="button alt" id="sendMessageButton" value="Pošalji poruku" /></li>
											</ul>
										</div>
									</div>
								</form>
							</section>
						</div>
					</div>

					<!-- Icons -->
						<ul class="icons">
							<li><a href="https://www.instagram.com/bojanicpcelarstvo" class="icon brands fa-instagram"><span class="label">Instagram</span></a></li>
							<li><a href="https://www.facebook.com/profile.php?id=61566439814594" class="icon brands fa-facebook-f"><span class="label">Facebook</span></a></li>
							<li><a href="https://www.tiktok.com/@pelarstvo.bojani" class="icon brands fa-tiktok"><span class="label">GitHub</span></a></li>
							<li><a href="https://www.linkedin.com/company/p%C4%8Delarstvo-bojani%C4%87/?lipi=urn%3Ali%3Apage%3Aorganization_admin_admin_dashboard%3Bb8766486-7aea-4b6c-86bf-31a3078dc250" class="icon brands fa-linkedin-in"><span class="label">LinkedIn</span></a></li>
						</ul>

					<!-- Copyright -->
						<div class="copyright">
							<ul class="menu">
								<li>&copy; Pčelarstvo Bojanić</li><li>Direktno iz prirode</a></li>
							</ul>
						</div>
`;

document.getElementById('footer').innerHTML = pageFooter;