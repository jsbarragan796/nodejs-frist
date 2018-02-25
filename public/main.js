/* global $ */

function update(tweets) {
  $("#tweets").empty();
  tweets.forEach((t)=>{
    let tweetDiv = $("<div class=col-sm-3>");
    let tweetRow = $("<div class=row>");
    tweetDiv.append($("<h3 class='name'>")
      .text(t.user.screen_name));
    tweetRow.append($("<div class=col-sm-2>")
      .append($("<img class='rounded mx-auto d-block'>")
        .attr("src", t.user.profile_image_url)
        .attr("alt", t.user.screen_name + " Photo")));
    tweetRow.append($("<div class=col-sm-10>")
      .append($("<div class='text'>")
        .text(t.text)));
    tweetDiv.append(tweetRow);
    $("#tweets").append(tweetDiv);
  });
}

$.getJSON("getTweets", (tweets, msg) => {
  if (msg!=="success") throw "Error";
  update(tweets);
  $("#search").on("keyup", () => {
    const search = $("#search").val();
    console.log(search);
    $.getJSON("getTweets?search="+search, (tweets, msg) => {
      if (msg!=="success") throw "Error";
      update(tweets);
    });
  });
  console.log(tweets);
});
