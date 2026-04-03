/**
 * Smart Link B2B Portal - Core Layout Controller
 * This script ensures the Header and Footer are consistent across all pages.
 */

// --- HELPER: COOKIE MANAGEMENT ---
window.setLanguageCookie = (lang) => {
	const d = new Date();
	d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000)); // 1 year expiry
	const expires = "expires=" + d.toUTCString();
	document.cookie = "preferred-lang=" + lang + ";" + expires + ";path=/";
};

window.getLanguageCookie = () => {
	const name = "preferred-lang=";
	const decodedCookie = decodeURIComponent(document.cookie);
	const ca = decodedCookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "ja"; // Default to Japanese
};

// --- 1. IMMEDIATE LANGUAGE INITIALIZATION ---
(function () {
	const preferredLang = window.getLanguageCookie();
	if (preferredLang === 'en') {
		document.documentElement.classList.add('lang-en');
		const bodyCheck = setInterval(() => {
			if (document.body) {
				document.body.classList.add('lang-en');
				clearInterval(bodyCheck);
			}
		}, 10);
		setTimeout(() => clearInterval(bodyCheck), 5000);
	}
})();

window.setLanguage = (lang) => {
	const body = document.body;
	const html = document.documentElement;
	window.setLanguageCookie(lang);

	if (lang === 'en') {
		body.classList.add('lang-en');
		html.classList.add('lang-en');
	} else {
		body.classList.remove('lang-en');
		html.classList.remove('lang-en');
	}

	const btnJa = document.getElementById('btn-ja');
	const btnEn = document.getElementById('btn-en');

	if (btnEn && btnJa) {
		if (lang === 'en') {
			btnEn.style.background = '#0fc5d3';
			btnEn.style.color = '#fff';
			btnJa.style.background = 'none';
			btnJa.style.color = 'rgba(255,255,255,0.5)';
		} else {
			btnJa.style.background = '#0fc5d3';
			btnJa.style.color = '#fff';
			btnEn.style.background = 'none';
			btnEn.style.color = 'rgba(255,255,255,0.5)';
		}
	}
};

// --- 2. INJECT GLOBAL STYLES ---
const langStyles = document.createElement('style');
langStyles.innerHTML = `
	.en { display: none !important; }
	html.lang-en .en, body.lang-en .en { display: block !important; }
	html.lang-en .ja, body.lang-en .ja { display: none !important; }
	
	span.en, i.en, a.en { display: none !important; }
	html.lang-en span.en, html.lang-en i.en, html.lang-en a.en,
	body.lang-en span.en, body.lang-en i.en, body.lang-en a.en { display: inline-block !important; }
	
	html.lang-en span.ja, html.lang-en i.ja, html.lang-en a.ja,
	body.lang-en span.ja, body.lang-en i.ja, body.lang-en a.ja { display: none !important; }

	/* Specialized visibility classes */
	.lang-en .show-en { display: block !important; }
	.lang-en .hide-en { display: none !important; }
`;
document.head.appendChild(langStyles);

const B2B_HEADER_HTML = `
		<div class="header_top">
			<div class="container">
				<div class="row">
					<div class="col-md-6">
						<div class="header_top_contact ul-li clearfix">
							<ul>
								<li> <i class="icon-envelope-letter"></i> Contactus@smartlinkco.jp</li>
								<li class="lang-switcher-container" style="margin-left: 20px; display: inline-block; vertical-align: middle;">
									<div class="lang-switch-pill" style="display: flex; background: rgba(0,0,0,0.2); border-radius: 20px; padding: 2px; border: 1px solid rgba(255,255,255,0.1);">
										<a href="javascript:void(0)" onclick="setLanguage('ja')" id="btn-ja" style="padding: 2px 12px; font-size: 11px; font-weight: 800; border-radius: 18px; color: #fff; background: #0fc5d3; transition: all 0.3s ease;">JP</a>
										<a href="javascript:void(0)" onclick="setLanguage('en')" id="btn-en" style="padding: 2px 12px; font-size: 11px; font-weight: 800; border-radius: 18px; color: rgba(255,255,255,0.5); transition: all 0.3s ease;">EN</a>
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div class="col-md-6">
						<div class="header_top_info float-right">
							<div class="top_info_item top_info_menu ul-li clearfix">
								<ul>
									<li><a href="https://www.linkedin.com/company/smart-link-jp" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin-in"></i></a></li>
									<li><a href="#" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook-f"></i></a></li>
									<li><a href="#" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a></li>
									<li><a href="about.html"><span class="ja">企業情報</span><span class="en">Corporate Info</span></a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="site-main-menu clearfix">
			<div class="container">
				<div class="brand-logo float-left">
					<a href="index.html" class="smart-link-logo-container">
						<img src="assets/img/logo/smart-link-logo.png" alt="Smart Link">
						<span class="company-name">Smart Link</span>
					</a>
					<div class="importer-badge d-none d-md-inline-block">
						<span class="ja">正規輸入販売元・日本国内PSE規格適合</span>
						<span class="en">Strategic Partner & PSE Certified</span>
					</div>
				</div>
				<nav class="main_navigation desktop-menu ul-li">
					<ul id="main-nav" class="navbar-nav text-uppercase clearfix">
						<li><a href="index.html"><span class="ja">ホーム</span><span class="en">Home</span></a></li>
						<li><a href="about.html"><span class="ja">会社概要</span><span class="en">About Us</span></a></li>
						<li class="dropdown">
							<a href="#"><span class="ja">製品情報</span><span class="en">Products</span></a>
							<ul class="dropdown-menu clearfix">
								<li class="dropdown">
									<a href="#"><span class="ja">LED照明</span><span class="en">LED Lighting</span></a>
									<ul class="dropdown-menu clearfix">
										<li><a href="titan-about.html"><span class="ja">Titan LED 概要</span><span class="en">Titan LED Overview</span></a></li>
										<li><a href="titan-led.html"><span class="ja">クリーンルーム用 (Spectrum Select)</span><span class="en">Cleanroom Series</span></a></li>
										<li><a href="commercial-led.html"><span class="ja">業務用LEDチューブ</span><span class="en">Commercial LED</span></a></li>
									</ul>
								</li>
								<li class="dropdown">
									<a href="#"><span class="ja">Blue Frontier 空調</span><span class="en">Blue Frontier AC</span></a>
									<ul class="dropdown-menu clearfix">
										<li><a href="blue-frontier-history.html"><span class="ja">Blue Frontier 概要</span><span class="en">Blue Frontier Overview</span></a></li>
										<li><a href="regenerative-ac.html"><span class="ja">技術・製品詳細</span><span class="en">Technology Details</span></a></li>
									</ul>
								</li>
								<li class="dropdown">
									<a href="software.html"><span class="ja">ソフトウェア</span><span class="en">Software</span></a>
									<ul class="dropdown-menu clearfix">
										<li><a href="operational-opt.html"><span class="ja">運用最適化</span><span class="en">Operational Opt</span></a></li>
										<li><a href="ems-tools.html"><span class="ja">EMSツール</span><span class="en">EMS Tools</span></a></li>
									</ul>
								</li>
							</ul>
						</li>
						<li><a href="case-studies.html"><span class="ja">導入事例</span><span class="en">Case Studies</span></a></li>
						<li class="dropdown">
							<a href="#"><span class="ja">サポート</span><span class="en">Support</span></a>
							<ul class="dropdown-menu clearfix">
								<li><a href="logistics.html"><span class="ja">輸入・物流管理</span><span class="en">Logistics</span></a></li>
								<li><a href="compliance.html"><span class="ja">コンプライアンス</span><span class="en">Compliance</span></a></li>
								<li><a href="warranty.html"><span class="ja">製品保証</span><span class="en">Warranty</span></a></li>
							</ul>
						</li>
						<li><a href="contact.html"><span class="ja">お問い合わせ</span><span class="en">Contact</span></a></li>
					</ul>
				</nav>
				<div class="site-search-btn float-right" style="margin-top: 10px;">
					<div class="con-btn titan-cta text-center text-uppercase">
						<a href="contact.html"><span class="ja">無償サンプル依頼</span><span class="en">Request Sample</span> <i class="flaticon-next"></i></a>
					</div>
				</div>
			</div>
		</div>
`;

const B2B_FOOTER_HTML = `
		<div class="footer-content" style="background: #111; color: #fff;">
			<div class="container">
				<div class="footer-widget-area" style="padding: 80px 0 50px;">
					<div class="row">
						<div class="col-lg-4 col-md-6">
							<div class="footer-widget-item pera-content">
								<div class="footer-logo" style="margin-bottom: 25px;">
									<a href="index.html" class="smart-link-logo-container">
										<img src="assets/img/logo/smart-link-logo.png" alt="Smart Link" style="height: 40px; margin-right: 15px;">
										<span class="company-name" style="color: #fff; font-size: 24px; font-weight: 800;">Smart Link</span>
									</a>
								</div>
								<div class="footer-contact-info" style="line-height: 1.8; font-size: 14px; color: #bbb;">
									<p class="ja">
										<strong>Smart Link合同会社</strong><br>
										〒810-0041 福岡県福岡市中央区大名二丁目９番３５号<br>
										トウセン天神ビル 9F
									</p>
									<p class="en">
										<strong>Smart Link LLC</strong><br>
										9F Tosen Tenjin Bldg, 2-9-35 Daimyo,<br>
										Chuo-ku, Fukuoka City, Fukuoka 810-0041
									</p>
									<p style="margin-top: 15px;">
										<i class="icon-envelope-letter" style="color: #0fc5d3; margin-right: 10px;"></i>
										Contactus@smartlinkco.jp
									</p>
								</div>
							</div>
						</div>
						<div class="col-lg-2 col-md-6">
							<div class="footer-widget-item">
								<h3 class="el-widget-title" style="color: #fff; font-size: 18px; font-weight: 700; margin-bottom: 25px; border-left: 3px solid #0fc5d3; padding-left: 15px;"><span class="ja">ソリューション</span><span class="en">Solutions</span></h3>
								<ul class="list-style-none footer-links" style="line-height: 2.5; font-size: 14px;">
									<li><a href="titan-led.html" style="color: #bbb;"><span class="ja">クリーンルーム照明</span><span class="en">Cleanroom Lighting</span></a></li>
									<li><a href="commercial-led.html" style="color: #bbb;"><span class="ja">業務用LEDチューブ</span><span class="en">Commercial LED</span></a></li>
									<li><a href="regenerative-ac.html" style="color: #bbb;"><span class="ja">Blue Frontier 空調</span><span class="en">Blue Frontier AC</span></a></li>
									<li><a href="software.html" style="color: #bbb;"><span class="ja">エネルギー管理ソフト</span><span class="en">Energy Software</span></a></li>
								</ul>
							</div>
						</div>
						<div class="col-lg-6 col-md-12">
							<div class="footer-widget-item">
								<h3 class="el-widget-title" style="color: #fff; font-size: 18px; font-weight: 700; margin-bottom: 25px; border-left: 3px solid #FFBF00; padding-left: 15px;"><span class="ja">ご利用規約・プライバシー</span><span class="en">Terms & Privacy</span></h3>
								<div class="confidential-footer" style="background: rgba(255,255,255,0.03); padding: 20px; border: 1px solid rgba(255,255,255,0.05); color: #888; font-size: 11px; line-height: 1.8;">
									<div style="margin-bottom: 15px;">
										<p class="ja"><strong>【個人情報の取り扱い】</strong> 当社は、お問い合わせ等で取得した個人情報を、ご回答および製品・サービスのご案内のみに使用し、第三者への提供は行いません。</p>
										<p class="en"><strong>【Privacy Policy】</strong> Personal data collected via inquiries is used solely for responding and service announcements. We do not provide data to third parties.</p>
									</div>
									<div>
										<p class="ja"><strong>【サイト利用について】</strong> 本サイトのコンテンツは著作権により保護されています。最新の情報を提供するよう努めておりますが、詳細な仕様は個別見積書に基づきます。</p>
										<p class="en"><strong>【Terms of Use】</strong> All site content is protected by copyright. While we strive for accuracy, final specifications are guided by individual quotes.</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="footer-copyright-text text-center" style="background: #000; padding: 20px 0; border-top: 1px solid rgba(255,255,255,0.05);">
			<div class="container">
				<p style="color: #666; font-size: 12px; margin: 0;">© 2026 Smart Link LLC (Smart Link 合同会社). All Rights Reserved.</p>
			</div>
		</div>
`;

document.addEventListener("DOMContentLoaded", function () {
	// 1. Determine the stored language preference from COOKIES
	const preferredLang = window.getLanguageCookie();
	
	// 2. Initial application (already partially handled by the IIFE at top)
	window.setLanguage(preferredLang);

	const headerEl = document.getElementById("header_id");
	const footerEl = document.getElementById("footer_id");

	if (headerEl) {
		headerEl.innerHTML = B2B_HEADER_HTML;
	}
	if (footerEl) {
		footerEl.innerHTML = B2B_FOOTER_HTML;
	}

	// Double-check correct button state
	window.setLanguage(preferredLang);

	// Re-run theme initializers if needed
	if (typeof ELTRON !== 'undefined') {
		ELTRON.Basic.MobileMenu();
	}
});
