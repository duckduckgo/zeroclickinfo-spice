function ddg_spice_canistreamit(movies) {
      // console.log(xk);

      var result,img,snippet,link,div;
      var items = new Array();
      for(var i = 0; i<movies.length; i++)
      {
          result = movies[i];

          // Make title for header
          var header = result.title + " ( "+result.year+")";

          // Call nra function as per Spice Plugin Guidelines

          var item = new Array();
          var content = "<div class='canistreamit_staring'>"+result.actors+"</div>";
          content += "<div class='canistreamit_availability'><h3>Streaming On:</h3><ul>";
          for(var subtype in result.affiliates)
          {
              var service = result.affiliates[subtype];
              content += "<li><a href='"+service.url+"'>"+service.friendlyName;
              var price = parseFloat(service.price);
              if(price > 0)
              content += " ($"+service.price+")";

              content += "</a>, </li>"
          }
          content += "</ul></div>"

          item['a'] = content;

          item['h'] = header;

          // Source name and url for the More at X link.
          item['s'] = 'CanIStream.It';
          item['u'] = result.links.shortUrl;

          // Force no compression.
          item['f'] = 1;

          // Thumbnail url
          item['i'] = result.image;

          items.push(item);

      }
      // The rendering function is nra.
      nra(items);
}

