/*
  Klangheft ohne Netz: Fällt das Schul-WLAN aus, startet die App trotzdem. Die Arbeiten liegen ohnehin auf dem
  Gerät (IndexedDB); hier geht es nur um die App selbst, ihre Schriften und Klänge.
  - Aufruf der Seite: zuerst übers Netz und immer beim Server nachgefragt, so kommt jede neue Fassung gleich an. Ohne Netz (oder wenn es hängt)
    die zuletzt geladene Seite.
  - Dateien der App von hier (Skripte, Stile, Schriften, Klänge, Symbole): aus dem Speicher, sonst übers Netz
    und dabei ablegen. Was in assets/ liegt, trägt eine Prüfsumme im Namen und ändert sich also nie.
  - Alles von anderswo (YouTube, Google) und alles andere von hier bleibt unberührt.
  Registriert wird er nur im fertigen Build (main.ts), mit relativem Pfad: So gilt er für den Ordner, in dem
  Klangheft liegt, auch für einen Unterordner wie /klangheft/.

  Schonend für den Server: In der Schule öffnen oft 30 Geräte Klangheft im selben Augenblick, alle über eine
  Adresse. Holte jedes dabei alle 400 Dateien, sperrte der KreaS-Server die ganze Schule als vermeintlichen
  Angreifer aus (23.11.2026: Klangheft und die KreaS-Seite waren aus dem Computerkabinett nicht mehr erreichbar). Deshalb:
  - Kein Vorladen: Ein Gerät legt nur ab, was es benutzt (die Klänge eines Instruments beim Öffnen). Ohne Netz geht
    also, was auf dem Gerät schon einmal lief.
  - Beim Einrichten einer neuen Fassung nur Seite, Skript und Stile übers Netz. Was sich seit der alten Fassung
    nicht geändert hat (laut Prüfsumme), kommt aus deren Speicher, auch die Klänge.
*/

// Beim Bauen setzt vite.config.ts (offlineFiles) hier die Version und alle Dateien der App mit ihrer Prüfsumme ein.
// Die Version ändert sich mit jedem Inhalt; daran erkennt der Browser die neue Fassung dieser Datei und installiert sie
const VERSION = '1800b61d84b0';
const FILES = {"apple-touch-icon.png":"8557b68b9191","assets/andika-cyrillic-400-normal-DYbdP60f.woff2":"e47365ddff65","assets/andika-cyrillic-700-normal-D404ywHU.woff2":"19c12d02bdbf","assets/andika-cyrillic-ext-400-normal-VNDy5CZS.woff2":"bd50ee47f1f0","assets/andika-cyrillic-ext-700-normal-DvCsrHON.woff2":"4ae9dc1e12ae","assets/andika-latin-400-normal-BTFTIZb-.woff2":"dd6bb7266c94","assets/andika-latin-700-normal-Dk95f5lc.woff2":"61c90acb5f96","assets/andika-latin-ext-400-normal-D580Nkki.woff2":"3b5fd6ac2e38","assets/andika-latin-ext-700-normal-Ch3SGZaH.woff2":"60bde176a34b","assets/andika-vietnamese-400-normal-afg23LQ3.woff2":"656c0fe2f642","assets/andika-vietnamese-700-normal-CS3rZngu.woff2":"afbc6f5d0300","assets/index-CNy4SHjB.css":"7bebfbf64836","assets/index-CXHGxhN6.js":"cd8a09da0c14","assets/noto-music-latin-400-normal-HxzE7T1U.woff2":"d4b7113fa203","assets/noto-music-latin-ext-400-normal-VTqZvLoa.woff2":"de2c73d9f39e","assets/noto-music-music-400-normal-CksxHXl6.woff2":"20881b15b870","favicon-32.png":"43531e69f082","favicon.svg":"445abe980bb1","icon-192.png":"4af99d3ba08b","icon-512.png":"8105228f52c8","icon-maskable-512.png":"0b95e17ec1f0","./":"6fd71f21a272","manifest.webmanifest":"b023ee8c2ec9","samples/bass/LIZENZ.txt":"97a7585ad1b7","samples/bass/bass_28.mp3":"4df2b981aee2","samples/bass/bass_31.mp3":"07cfbd322f65","samples/bass/bass_34.mp3":"e7cdd39b9a3b","samples/bass/bass_37.mp3":"ca9dfb861123","samples/bass/bass_40.mp3":"67326735c5e7","samples/bass/bass_43.mp3":"f965aa514165","samples/bass/bass_46.mp3":"9a070a739046","samples/bass/bass_49.mp3":"b1c01c567539","samples/bass/bass_52.mp3":"ec9359404dc7","samples/bass/bass_55.mp3":"085a68b911ce","samples/bass/bass_58.mp3":"9110b73f3afe","samples/brass/LIZENZ.txt":"8043f1b1a9fe","samples/brass/brass_36.mp3":"07254023b47f","samples/brass/brass_39.mp3":"5c7ca241f954","samples/brass/brass_42.mp3":"f164b5925c07","samples/brass/brass_45.mp3":"d1642c05686c","samples/brass/brass_48.mp3":"7bb1094980ae","samples/brass/brass_51.mp3":"c5c2a07f3b6e","samples/brass/brass_54.mp3":"e79c2192204a","samples/brass/brass_57.mp3":"956edfba729c","samples/brass/brass_60.mp3":"6f479b42e8e4","samples/brass/brass_63.mp3":"7f76ed21cea8","samples/brass/brass_66.mp3":"1896af91181b","samples/brass/brass_69.mp3":"ef2910ad675a","samples/brass/brass_72.mp3":"533885636f13","samples/brass/brass_75.mp3":"9fe189010a14","samples/brass/brass_78.mp3":"8cfe6c7ad877","samples/brass/brass_81.mp3":"61b8f5ddd78a","samples/brass/brass_84.mp3":"f381128d9d95","samples/brass/brass_87.mp3":"7fde2e4d3d3b","samples/cello/LIZENZ.txt":"816f6b7abe00","samples/cello/cello_36.mp3":"f13014d9b4f9","samples/cello/cello_39.mp3":"71b5108b7353","samples/cello/cello_43.mp3":"3bbc70143ff1","samples/cello/cello_45.mp3":"e90b6c9e36b1","samples/cello/cello_48.mp3":"3df9ea7a7c5e","samples/cello/cello_51.mp3":"250a48282c4e","samples/cello/cello_54.mp3":"5bbbb86d539b","samples/cello/cello_57.mp3":"e5ba4b0ed7b9","samples/cello/cello_61.mp3":"95106b859797","samples/cello/cello_63.mp3":"80e783b08dc9","samples/cello/cello_66.mp3":"80241dc51b33","samples/cello/cello_69.mp3":"c93bb3cf39b4","samples/cello/cello_72.mp3":"3cd9e4a12962","samples/drums/LIZENZ.txt":"0fc0a4bad03d","samples/drums/bongo_1_1.mp3":"118b31c02f56","samples/drums/bongo_1_2.mp3":"7ba395791e92","samples/drums/bongohi_dumpf_1.mp3":"03d176530df8","samples/drums/bongohi_dumpf_2.mp3":"a576b4235aec","samples/drums/bongohi_offen_1.mp3":"906bfee6de06","samples/drums/bongohi_offen_2.mp3":"b7f677ef321f","samples/drums/bongolo_dumpf_1.mp3":"a44b97ef0fc5","samples/drums/bongolo_dumpf_2.mp3":"c720b1779e45","samples/drums/bongolo_offen_1.mp3":"1c8319d73aa0","samples/drums/bongolo_offen_2.mp3":"1a67106beac1","samples/drums/cajbass_1_1.mp3":"01152d64d9c2","samples/drums/cajbass_1_2.mp3":"b96ec36105a8","samples/drums/cajbass_2_1.mp3":"1eb52b5996a1","samples/drums/cajbass_2_2.mp3":"d2c00f216125","samples/drums/cajslap_1_1.mp3":"198d1e022fac","samples/drums/cajslap_1_2.mp3":"ab4c4e38a71b","samples/drums/cajslap_2_1.mp3":"34f8413e63f1","samples/drums/cajslap_2_2.mp3":"61b63a04a6c1","samples/drums/clap_1_1.mp3":"c7c507f380da","samples/drums/clap_1_2.mp3":"881d40efeaa8","samples/drums/clap_1_3.mp3":"122b79ec87d7","samples/drums/clave_1_1.mp3":"6dddb87baacf","samples/drums/clave_1_2.mp3":"7d7f16558972","samples/drums/clave_hoch_1.mp3":"82781138965f","samples/drums/clave_hoch_2.mp3":"8abba0602067","samples/drums/clave_tief_1.mp3":"8ee2af94c8ed","samples/drums/clave_tief_2.mp3":"cdaa10743e43","samples/drums/congahi_1_1.mp3":"459dd50c6497","samples/drums/congahi_1_2.mp3":"0f4f6a7c681a","samples/drums/congahi_dumpf_1.mp3":"2a2eae037407","samples/drums/congahi_dumpf_2.mp3":"097c523a5fe6","samples/drums/congahi_offen_1.mp3":"e983688858b1","samples/drums/congahi_offen_2.mp3":"85a9ff329a1b","samples/drums/congahi_slap_1.mp3":"f8d7d85da8a7","samples/drums/congalo_1_1.mp3":"6d4c2ff7417e","samples/drums/congalo_1_2.mp3":"ed00120ab5d2","samples/drums/congalo_dumpf_1.mp3":"d33e97b3d879","samples/drums/congalo_dumpf_2.mp3":"bb508df46670","samples/drums/congalo_offen_1.mp3":"8cebd61135a0","samples/drums/congalo_offen_2.mp3":"ad2be20fc73a","samples/drums/congalo_slap_1.mp3":"dd9bd45b39c2","samples/drums/cowbell_1_1.mp3":"7f2ed8b2fc78","samples/drums/cowbell_1_2.mp3":"ae13bba45b02","samples/drums/cowbell_koerper_1.mp3":"a2d282e072e9","samples/drums/cowbell_koerper_2.mp3":"2075da0e53d3","samples/drums/cowbell_mund_1.mp3":"bebc806bb212","samples/drums/cowbell_mund_2.mp3":"e32dea5c270f","samples/drums/crash_1_1.mp3":"c8fa78367ec0","samples/drums/crash_1_2.mp3":"c9952d12a96e","samples/drums/guiro_1_1.mp3":"d2d6696cebb6","samples/drums/guiro_1_2.mp3":"9e8189e3eb4e","samples/drums/guiro_kurz_1.mp3":"ca19935b9b54","samples/drums/guiro_kurz_2.mp3":"11c464fc3e31","samples/drums/guiro_langsam_1.mp3":"adcfd50a266e","samples/drums/guiro_mittel_1.mp3":"3fa502483c39","samples/drums/guiro_schnell_1.mp3":"efc119dac34e","samples/drums/hat_1_1.mp3":"b38993c9d271","samples/drums/hat_1_2.mp3":"393b59c13df8","samples/drums/hat_1_3.mp3":"94052b23e60b","samples/drums/hat_2_1.mp3":"9eef70640b03","samples/drums/hat_2_2.mp3":"b1f96cad9b27","samples/drums/hat_2_3.mp3":"5b72cf1fa00e","samples/drums/kick_1_1.mp3":"5e5b71e27568","samples/drums/kick_1_2.mp3":"bf63c842ac43","samples/drums/kick_1_3.mp3":"14eb50e4d6d1","samples/drums/kick_2_1.mp3":"f14876401fec","samples/drums/kick_2_2.mp3":"eb9b7212779d","samples/drums/kick_2_3.mp3":"d885733b94a3","samples/drums/ohat_1_1.mp3":"e3d3a93e06bd","samples/drums/ohat_1_2.mp3":"12f6b780c0c6","samples/drums/ride_1_1.mp3":"bdd1a8cfa4cd","samples/drums/ride_1_2.mp3":"751310beaa7a","samples/drums/rim_1_1.mp3":"e215128ed197","samples/drums/rim_1_2.mp3":"3a82169a3a8d","samples/drums/rim_1_3.mp3":"4723ee267a0e","samples/drums/shaker_1_1.mp3":"eba54cbf6e36","samples/drums/shaker_1_2.mp3":"2c7234b8dd5b","samples/drums/shaker_schuetteln_1.mp3":"5a3103fc94e7","samples/drums/shaker_schuetteln_2.mp3":"22df687ad6ae","samples/drums/shaker_schuetteln_3.mp3":"783f9b486d7a","samples/drums/shaker_schuetteln_4.mp3":"0c5376c9e667","samples/drums/snare_1_1.mp3":"4cd93eeafc59","samples/drums/snare_1_2.mp3":"45d8d8e175ad","samples/drums/snare_1_3.mp3":"2fc943d92faf","samples/drums/snare_2_1.mp3":"7098563f1c3b","samples/drums/snare_2_2.mp3":"abccaef150ac","samples/drums/snare_2_3.mp3":"65d22cee30ed","samples/drums/timbale_hoch-fell_1.mp3":"eb95c0dce10b","samples/drums/timbale_hoch-fell_2.mp3":"65496d93c982","samples/drums/timbale_hoch-rand_1.mp3":"646bf8c6a4c7","samples/drums/timbale_hoch-rand_2.mp3":"037ee5c2404f","samples/drums/timbale_tief-fell_1.mp3":"cb92d31c4161","samples/drums/timbale_tief-fell_2.mp3":"c0cc9fa35305","samples/drums/timbale_tief-rand_1.mp3":"273cfa56768a","samples/drums/timbale_tief-rand_2.mp3":"5840974d5839","samples/drums/tomhi_1_1.mp3":"ac03909439f4","samples/drums/tomhi_1_2.mp3":"63b230f12635","samples/drums/tomhi_2_1.mp3":"9290296a1ce3","samples/drums/tomhi_2_2.mp3":"60a8a7510ade","samples/drums/tomlo_1_1.mp3":"88770b9e72b5","samples/drums/tomlo_1_2.mp3":"faaec40b529c","samples/drums/tomlo_2_1.mp3":"60426b4faacf","samples/drums/tomlo_2_2.mp3":"e2683490c2f4","samples/ebass/LIZENZ.txt":"351ddada4c80","samples/ebass/baby_28.mp3":"2f379057731f","samples/ebass/baby_29.mp3":"d396e31c9ac5","samples/ebass/baby_30.mp3":"87bf195aef54","samples/ebass/baby_31.mp3":"7491aae655a4","samples/ebass/baby_32.mp3":"912dce7deb82","samples/ebass/baby_33.mp3":"73fd650e7699","samples/ebass/baby_34.mp3":"e2ecde15e02b","samples/ebass/baby_35.mp3":"0052fbfb9b38","samples/ebass/baby_36.mp3":"60be0975a93e","samples/ebass/baby_37.mp3":"d38552160c3e","samples/ebass/baby_38.mp3":"c47ceeae66c3","samples/ebass/baby_39.mp3":"806f2eebf2d1","samples/ebass/baby_40.mp3":"fab98ebf66d5","samples/ebass/baby_41.mp3":"d7eb7758785d","samples/ebass/baby_42.mp3":"9d50452c1b54","samples/ebass/baby_43.mp3":"b3c858c86e3d","samples/ebass/baby_44.mp3":"12e9bc503992","samples/ebass/baby_45.mp3":"27739effac40","samples/ebass/baby_46.mp3":"3f6009b51445","samples/ebass/baby_47.mp3":"d16e6353eebe","samples/ebass/baby_48.mp3":"f90d448d530b","samples/ebass/baby_49.mp3":"81b47f266de8","samples/ebass/baby_50.mp3":"9933b99d1789","samples/ebass/baby_51.mp3":"43141725b1d8","samples/floete/LIZENZ.txt":"6ed19cde2f1f","samples/floete/floete_60.mp3":"8ee82930cfb6","samples/floete/floete_64.mp3":"29a25d60f46b","samples/floete/floete_69.mp3":"db8bb075084d","samples/floete/floete_72.mp3":"dbe29f518dce","samples/floete/floete_76.mp3":"3ebf55dec876","samples/floete/floete_81.mp3":"029d06e0d9b2","samples/floete/floete_84.mp3":"3d32b85fa6ee","samples/gitarre/LIZENZ.txt":"d07e611f83d7","samples/gitarre/gitarre_40.mp3":"5b0bf599e8de","samples/gitarre/gitarre_43.mp3":"09eefc279b39","samples/gitarre/gitarre_45.mp3":"0b1df90ba155","samples/gitarre/gitarre_48.mp3":"75621de1a512","samples/gitarre/gitarre_52.mp3":"238069bcecda","samples/gitarre/gitarre_55.mp3":"68ce43076493","samples/gitarre/gitarre_57.mp3":"df3f1b48bfdc","samples/gitarre/gitarre_60.mp3":"4ba2ba8fa54c","samples/gitarre/gitarre_63.mp3":"add2132c6190","samples/gitarre/gitarre_66.mp3":"d2b397e650ff","samples/gitarre/gitarre_69.mp3":"d8cb67dd0963","samples/gitarre/gitarre_72.mp3":"fdc900c96365","samples/harfe/LIZENZ.txt":"ac6c9ff76b3a","samples/harfe/harfe_55.mp3":"33444c1727c2","samples/harfe/harfe_59.mp3":"00a61afbe754","samples/harfe/harfe_62.mp3":"05e753cb0320","samples/harfe/harfe_65.mp3":"cc4c20cb02c4","samples/harfe/harfe_69.mp3":"a7cf44e3c6ea","samples/harfe/harfe_72.mp3":"a75dcf91d4e3","samples/harfe/harfe_76.mp3":"0b9ac6f0ab7e","samples/konzertgitarre/LIZENZ.txt":"1d2d504bd17b","samples/konzertgitarre/kg_40.mp3":"cebce366e98c","samples/konzertgitarre/kg_41.mp3":"23ad285f0d7b","samples/konzertgitarre/kg_43.mp3":"e4517fb1f157","samples/konzertgitarre/kg_45.mp3":"6313230bed3e","samples/konzertgitarre/kg_47.mp3":"8c0002adb89b","samples/konzertgitarre/kg_48.mp3":"3cf2e6da72d5","samples/konzertgitarre/kg_50.mp3":"3498c13a22ca","samples/konzertgitarre/kg_52.mp3":"b1812a41f04f","samples/konzertgitarre/kg_53.mp3":"4c86e92a0244","samples/konzertgitarre/kg_54.mp3":"5ba4da7c616c","samples/konzertgitarre/kg_55.mp3":"261b211cb279","samples/konzertgitarre/kg_56.mp3":"2ae508cd3656","samples/konzertgitarre/kg_57.mp3":"43b0da315074","samples/konzertgitarre/kg_58.mp3":"8b01881ab5e3","samples/konzertgitarre/kg_59.mp3":"0d0d974bf481","samples/konzertgitarre/kg_60.mp3":"efc106fa0e41","samples/konzertgitarre/kg_61.mp3":"475f3d42ffc5","samples/konzertgitarre/kg_62.mp3":"d5d564e83bc0","samples/konzertgitarre/kg_63.mp3":"f1941fa8b554","samples/konzertgitarre/kg_64.mp3":"54f2ef4ed50c","samples/konzertgitarre/kg_65.mp3":"71e8f0ccde29","samples/konzertgitarre/kg_66.mp3":"a5078903e667","samples/konzertgitarre/kg_67.mp3":"0e1ea15da35f","samples/konzertgitarre/kg_69.mp3":"992291e3a599","samples/konzertgitarre/kg_70.mp3":"c5d50d734856","samples/konzertgitarre/kg_71.mp3":"48055c72fc08","samples/konzertgitarre/kg_72.mp3":"5371badd8098","samples/mallets/LIZENZ.txt":"3c07080f5ea6","samples/mallets/glock_103.mp3":"9035396de677","samples/mallets/glock_108.mp3":"aeac3b5fcc5f","samples/mallets/glock_79.mp3":"82f10525e5db","samples/mallets/glock_84.mp3":"ab64907478a1","samples/mallets/glock_91.mp3":"6725ef12b740","samples/mallets/glock_96.mp3":"2cc924efc816","samples/mallets/xylo_103.mp3":"7d2e99c5388e","samples/mallets/xylo_108.mp3":"7fbbefc0ef2b","samples/mallets/xylo_72.mp3":"95b0b0e8db98","samples/mallets/xylo_79.mp3":"05596a65770b","samples/mallets/xylo_84.mp3":"b757f327f792","samples/mallets/xylo_91.mp3":"7a29fe792af6","samples/mallets/xylo_96.mp3":"52f268946d38","samples/marimba/LIZENZ.txt":"c292d037d247","samples/marimba/marimba_47.mp3":"9f36db7f23f5","samples/marimba/marimba_53.mp3":"e9a18f1fa43a","samples/marimba/marimba_60.mp3":"9b3e20d00578","samples/marimba/marimba_67.mp3":"18a694593584","samples/marimba/marimba_71.mp3":"80793d3ec203","samples/marimba/marimba_77.mp3":"53946fbcfbf7","samples/marimba/marimba_84.mp3":"8eddd21a57e9","samples/orgel/LIZENZ.txt":"c01e984fa142","samples/orgel/orgel_60.mp3":"4d664daebb61","samples/orgel/orgel_63.mp3":"188b7d5d113e","samples/orgel/orgel_66.mp3":"b88d9d00a1a1","samples/orgel/orgel_69.mp3":"ef998e23d710","samples/orgel/orgel_72.mp3":"266dcde21e0b","samples/piano/A1.mp3":"17fa1e363f9f","samples/piano/A2.mp3":"20601d890f44","samples/piano/A3.mp3":"8e108fe228e3","samples/piano/A4.mp3":"a62df24a2c84","samples/piano/A5.mp3":"9e5cee1fe9cf","samples/piano/A6.mp3":"b6064a657592","samples/piano/A7.mp3":"751c0a0acd00","samples/piano/C2.mp3":"7029a9e84f74","samples/piano/C3.mp3":"bb70dd921d81","samples/piano/C4.mp3":"689eaa4c2fd7","samples/piano/C5.mp3":"2f5b0f742206","samples/piano/C6.mp3":"0d3232edd13b","samples/piano/C7.mp3":"694b512fac99","samples/piano/C8.mp3":"b4b5f321751b","samples/piano/Ds2.mp3":"a106cdec93aa","samples/piano/Ds3.mp3":"4fe73ea3f2c5","samples/piano/Ds4.mp3":"663e8bb3e2d0","samples/piano/Ds5.mp3":"bf71096e653a","samples/piano/Ds6.mp3":"eb643014d9f9","samples/piano/Ds7.mp3":"d51f4c51bed7","samples/piano/Fs2.mp3":"dd34c708274e","samples/piano/Fs3.mp3":"960fefd90f56","samples/piano/Fs4.mp3":"613652f5c96e","samples/piano/Fs5.mp3":"ed2fdf543274","samples/piano/Fs6.mp3":"c584d2b4e96a","samples/piano/Fs7.mp3":"e9ce71e0f7dc","samples/piano/LIZENZ.txt":"9664391f0e74","samples/square/LIZENZ.txt":"bb5bd2cd0e08","samples/square/square_36.mp3":"967d5684efa6","samples/square/square_39.mp3":"01a750045284","samples/square/square_42.mp3":"672b54874a5c","samples/square/square_45.mp3":"9053218642db","samples/square/square_48.mp3":"c142f63b6f41","samples/square/square_51.mp3":"ab5fc84993e4","samples/square/square_54.mp3":"25977357691f","samples/square/square_57.mp3":"e9af06e8ad90","samples/square/square_60.mp3":"23ebd0f4e98f","samples/square/square_63.mp3":"1eef4d021c1e","samples/square/square_66.mp3":"e0c2c3936848","samples/square/square_69.mp3":"f5e14559b46c","samples/square/square_72.mp3":"354680a5f800","samples/square/square_75.mp3":"3747aaf09fa5","samples/square/square_78.mp3":"d030629a823f","samples/square/square_81.mp3":"31ad77205531","samples/square/square_84.mp3":"88f5bbac9339","samples/square/square_87.mp3":"daf537b2fbc0","samples/supersaw/LIZENZ.txt":"cab6924fbbc7","samples/supersaw/supersaw_36.mp3":"7b32de2bf8d5","samples/supersaw/supersaw_39.mp3":"8d6deaa80a72","samples/supersaw/supersaw_42.mp3":"c1d8a5be8abd","samples/supersaw/supersaw_45.mp3":"75c63be43807","samples/supersaw/supersaw_48.mp3":"01e45c246b3e","samples/supersaw/supersaw_51.mp3":"e7da6afdb6d9","samples/supersaw/supersaw_54.mp3":"e7469395ff05","samples/supersaw/supersaw_57.mp3":"6d0ecd297593","samples/supersaw/supersaw_60.mp3":"8b40670e98f5","samples/supersaw/supersaw_63.mp3":"5b21ef69d69f","samples/supersaw/supersaw_66.mp3":"dc2d7cdbbd4e","samples/supersaw/supersaw_69.mp3":"78669695f888","samples/supersaw/supersaw_72.mp3":"05c343be86be","samples/supersaw/supersaw_75.mp3":"1d732124eb1e","samples/supersaw/supersaw_78.mp3":"9bf15a1f437a","samples/supersaw/supersaw_81.mp3":"c75fc5920ddb","samples/supersaw/supersaw_84.mp3":"4dd0eeeec6da","samples/supersaw/supersaw_87.mp3":"27d0bf9a1513","samples/trance/LIZENZ.txt":"f1493b6c2ef6","samples/trance/trance_36.mp3":"3bd3497ad801","samples/trance/trance_39.mp3":"5aacea808a34","samples/trance/trance_42.mp3":"9b291714a420","samples/trance/trance_45.mp3":"600f4dd821f4","samples/trance/trance_48.mp3":"a9b24ee965b7","samples/trance/trance_51.mp3":"670a59522464","samples/trance/trance_54.mp3":"b5177a1acda1","samples/trance/trance_57.mp3":"41f92b8ea5bf","samples/trance/trance_60.mp3":"1244ee244c67","samples/trance/trance_63.mp3":"9e67eabaacb0","samples/trance/trance_66.mp3":"4c3cfba9446e","samples/trance/trance_69.mp3":"b5934f1f9cf2","samples/trance/trance_72.mp3":"fb9b9d21b6fd","samples/trance/trance_75.mp3":"d12099d67f07","samples/trance/trance_78.mp3":"b41b0c7e41a0","samples/trance/trance_81.mp3":"7fb78d8e989d","samples/trance/trance_84.mp3":"d60ac618ac4f","samples/trance/trance_87.mp3":"1de83f3064cb","samples/ukulele/LIZENZ.txt":"4970e262ec0e","samples/ukulele/tenor_60.mp3":"280d0e823785","samples/ukulele/tenor_62.mp3":"26e266f67b09","samples/ukulele/tenor_64.mp3":"ce6bf24b2f7c","samples/ukulele/tenor_66.mp3":"53186a615e65","samples/ukulele/tenor_67.mp3":"de082e8e5202","samples/ukulele/tenor_69.mp3":"864e4f0c3000","samples/ukulele/tenor_71.mp3":"31c1785566ce","samples/ukulele/tenor_73.mp3":"d3e7ffb713ca","samples/ukulele/tenor_75.mp3":"20ce9ab835d5","samples/ukulele/tenor_77.mp3":"3451efaee431","samples/ukulele/tenor_79.mp3":"daf95b5b5c0c","samples/ukulele/tenor_81.mp3":"f21d6111d709","samples/ukulele/tenor_84.mp3":"f35532494d92","samples/vibraphon/LIZENZ.txt":"ac0b4a2d6ebd","samples/vibraphon/vibraphon_48.mp3":"9e751031afc3","samples/vibraphon/vibraphon_52.mp3":"7f11d223881b","samples/vibraphon/vibraphon_55.mp3":"4c77dfe5d867","samples/vibraphon/vibraphon_59.mp3":"e00e3498d4d6","samples/vibraphon/vibraphon_62.mp3":"fd6364e73ffa","samples/vibraphon/vibraphon_65.mp3":"66e020d86555","samples/vibraphon/vibraphon_69.mp3":"687bb2ed9000","samples/vibraphon/vibraphon_72.mp3":"9d74880a890f","samples/vibraphon/vibraphon_76.mp3":"2b769f92ce32"};

const PREFIX = 'klangheft-';
const CACHE = PREFIX + VERSION;
const SCOPE = self.registration.scope;
/** Die Seite selbst, abgelegt unter der Adresse des Ordners */
const INDEX = SCOPE;
/** Unter dieser Adresse liegen im Speicher die Prüfsummen seiner Fassung (keine echte Datei auf dem Server) */
const PRUEFSUMMEN = SCOPE + 'klangheft-pruefsummen.json';
/** So lange auf das Netz warten, bevor die abgelegte Seite kommt (WLAN verbunden, aber ohne Internet) */
const PATIENCE = 4000;

const LISTE = Object.keys(FILES);
const kennt = (f) => Object.prototype.hasOwnProperty.call(FILES, f);
const urlOf = (f) => new URL(f, SCOPE).href;
const rel = (url) => url.slice(SCOPE.length).split(/[?#]/)[0];
const isIndex = (url) => ['', 'index.html'].includes(rel(url));
/** Eine umgeleitete Antwort darf nicht als Seite dienen (Safari verweigert sie dann): als einfache Antwort ablegen */
const plain = async (res) => (res.redirected ? new Response(await res.blob(), { status: res.status, headers: res.headers }) : res);
/** Ohne Seite, Skript und Stile taugt der Speicher nichts */
const needed = (f) => f === './' || /^assets\/.*\.(js|css)$/.test(f);

/** Eine Datei übers Netz holen und ablegen */
async function laden(cache, f) {
  const url = urlOf(f);
  // Dateien mit Prüfsumme im Namen dürfen aus dem Browser-Cache kommen, alles andere frisch vom Server
  const res = await fetch(url, f.startsWith('assets/') ? {} : { cache: 'no-cache' });
  if (!res.ok) throw new Error(`${res.status} ${f}`);
  await cache.put(url, await plain(res));
}

/** Unveränderte Dateien aus dem Speicher älterer Fassungen übernehmen, statt sie neu zu laden */
async function uebernehmen(cache) {
  for (const key of await caches.keys()) {
    if (!key.startsWith(PREFIX) || key === CACHE) continue;
    const alt = await caches.open(key);
    // Ältere Fassungen ohne Prüfsummen: dann nur, was die Prüfsumme im Namen trägt
    const summen = await alt.match(PRUEFSUMMEN).then((r) => (r ? r.json() : {})).catch(() => ({}));
    for (const f of LISTE) {
      if (!(f.startsWith('assets/') || summen[f] === FILES[f])) continue;
      const url = urlOf(f);
      if (await cache.match(url)) continue;
      const res = await alt.match(url);
      if (res) await cache.put(url, res);
    }
  }
}

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await uebernehmen(cache);
    // Fehlt davon etwas, scheitert das Einrichten, und der Browser versucht es beim nächsten Besuch
    await Promise.all(LISTE.filter(needed).map(async (f) => { if (!(await cache.match(urlOf(f)))) await laden(cache, f); }));
    await cache.put(PRUEFSUMMEN, new Response(JSON.stringify(FILES), { headers: { 'Content-Type': 'application/json' } }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    for (const key of await caches.keys()) if (key.startsWith(PREFIX) && key !== CACHE) await caches.delete(key);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  // Nur Abrufe innerhalb von Klangheft; YouTube, Google und alles andere gehen am Speicher vorbei
  if (req.method !== 'GET' || !req.url.startsWith(SCOPE)) return;
  if (req.mode === 'navigate') {
    e.respondWith(page(e));
    return;
  }
  // Teilstücke (etwa beim Abspielen von Medien) und Unbekanntes macht der Browser selbst
  if (req.headers.has('range')) return;
  const r = rel(req.url);
  if (!(r.startsWith('assets/') || r.startsWith('samples/') || kennt(r))) return;
  e.respondWith(file(e));
});

/**
 * Seite: zuerst übers Netz, sonst die zuletzt geladene.
 * Immer beim Server nachfragen (no-cache), nie still die Seite aus dem Browser-Cache nehmen: Der Server sagt nicht, wie
 * lange sie gilt, und dann schätzt der Browser selbst. So lief auf manchen Geräten nach dem Hochladen noch stundenlang
 * die alte Fassung (26.11.2026). Ist nichts neu, antwortet der Server nur „unverändert“, das schont ihn trotzdem.
 */
function page(e) {
  let store;
  const net = fetch(e.request.url, { cache: 'no-cache', credentials: 'same-origin' }).then((res) => {
    if (res.ok && isIndex(e.request.url)) {
      // Gleich kopieren: Den Inhalt liest danach der Browser
      const copy = res.clone();
      store = caches.open(CACHE).then(async (c) => c.put(INDEX, await plain(copy)));
    }
    return res;
  });
  // Die neue Seite auch dann ablegen, wenn die abgelegte schneller war
  e.waitUntil(net.then(() => store).catch(() => {}));
  return (async () => {
    const saved = await caches.open(CACHE).then((c) => c.match(INDEX));
    if (!saved) return net;
    return Promise.race([
      // Eine Fehlerseite des Servers (Wartung, kaputtes Hochladen) schlägt die abgelegte App nicht
      net.then((res) => (res.ok || !isIndex(e.request.url) ? res : saved), () => saved),
      new Promise((resolve) => setTimeout(() => resolve(saved), PATIENCE)),
    ]);
  })();
}

/** Datei der App: aus dem Speicher, sonst übers Netz und dabei ablegen */
async function file(e) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(e.request, { ignoreVary: true });
  if (hit) return hit;
  const res = await fetch(e.request);
  if (res.ok && res.type === 'basic') e.waitUntil(cache.put(e.request, res.clone()));
  return res;
}
