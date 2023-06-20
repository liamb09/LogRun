<?php
$lrdistance = "";
$total_dist = 0;
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $lrdistance = $_POST["record-run-distance"];
    $total_dist += $lrdistance;
}
?>

<html>
    <head>
        <script src="scripts.js"></script>
        <link rel="stylesheet" href="styles.css">
    </head>
    <header>
        <img src="https://piskel-imgstore-b.appspot.com/img/fb3c9542-055f-11ee-885e-273f48dfa5ea.gif" alt="logo" id="logo">
        <div id="page-links">
            <a href="index.html" class="page-link">Home</a>
            <a href="log.php" class="page-link">Log</a>
            <a href="about.html" class="page-link">About</a>
            <a href="https://github.com/liamb09" class="page-link" style="margin-right: 0px !important;">liamb09</a>
    </header>
    <body onload="updateTotalMiles()">
        <div id="main-image">
            <img src="https://lh3.googleusercontent.com/xJPHEtkppi-rVBXHBre0K4TcjpvpLZgPU4egPVSEhOiBP9UqVIsjKk9sOV_vH0brtn9ptAAK2Ihz95FFIcjkL5Ub2iXNAzNIqETjV6xyPzQnU9uu9cGVM2x0kzp0u6qj2wGATAxB0byimejvEVCGkWBO9rlq7reqOe8euLToBE544F6WZ2CWTu_zoAQpTwHPNsgVo7AbzKCtxsLpijb7TjJLYvw75e-5Hf8Xl53EVyjtBRzGWStnmrhuTt40BCmN-DcgUahcwDlsc-2RiN6V-zDDzG33LiHjCFIwaThKQdEktEhw_D3tBPaFBDf4xfWl9KqBLqNfpPirk58BhU6T6egWhibDw6h7v4S_frx5H08mSW7dNw8zzngXg0ND_yu13hYZ3BhTSV9p4-UZVrdSgcTB5x92Y280ruZ4j3faJbJOm81tbpt4sqhDnzn_N-wApxdDnyqas-yefje-z-KZS9KlXsEX4CTY-yVmFWKA_s1ld7d9yRWEM76gs02Y8C1EIQgSSXR9JWMsQlYbp1W-TdDgXsAOEimGltHr7CdOG6FchHJMfWfRbXcQnV2iVL-KArSEht9f0Nkg2v_qW5MIoYtxWwtC0m7RvEt2sq4S1mn2E4dHt_6egyNAhd9qwvW3l-HgAcJyNq49oQ8b-murlO5KOsy0s0xKI3wBou9-pbrCK5RGoOPwLeRbvqsb2aktiu7-wsw8g_D6h2v-U6eJwS8o0XLh9o5oMct6O1AFldalfiT3qQ95gUJxaOQRF5t6mnpRxqbYvLFklI75XfxsX1QhlevTBc9rcU9z-Bje8xxKYJZDyZW9U9MrSJtXicj90l8UrmUC9Xxlb9UPXKGyJPq0vFRFTL6Fa2fCLemRttd0qPSYB2i2krLno44tEKXuMtIavHRkSZQbbAmVXu5aIYc8i8oh7_ziDvPbY1RnKSYGY62h=w1080-h268-s-no?authuser=0" alt="road" class="road">
            <h1 class="page-title">Running Log</h1>
        </div>
        <br><br>
        <h1 id="micount">0.00</h1>
        <h1 id="mile-count-label"> Total Miles</h1>
        <br>
        <div id="record-run-button-container"><a href="addrun.php"><button class="button">Record Run</button></a></div>
    </body>
</html>