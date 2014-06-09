# DuckDuckGo Pokédex (PsyDuckGo)

Using this template will help us better understand your Instant Answer and assist you when necessary.  Simply copy and paste the markdown below into the description of your GitHub pull request and complete as appropriate.

**What does your instant answer do?**

DuckDuckGo Pokédex aims to provide instant answers for searches relating to Pokémon, particularly for numerical or name searches.
The intention of the instant answer would be to mimic some functionality of the in-game Pokédex, providing an image, description, evolutionary path, and in-game stats for the Pokémon searched.

**What problem does your instant answer solve (Why is it better than organic links)?**

My instant answer seeks to provide relevant in-game statistics such as base stats, typing, and evolutionary path that most Pokémon players are seeking from online guides and databases.
  
**What is the data source for your instant answer? (Provide a link if possible)**

http://pokeapi.co

**Why did you choose this data source?**

The PokeAPI, despite it's incomplete nature, the easiest to use database for relevant statistics. It provides JSON-formatted data for a variety of Pokémon topics.

**Are there any other alternative (better) data sources?**

Data grabbed from veekun, Bulbapedia, or Serebii.net is usually much more complete, but those sites do not provide JSON APIs. 

**What are some example queries that trigger this instant answer?**

"pokemon 176"
"pokedex 1"
(pokedex bulbasaur)

**Which communities will this instant answer be especially useful for? (gamers, book lovers, etc)**

This instant answer is aimed towards the large playerbase of the Pokémon franchise.

**Is this instant answer connected to a DuckDuckHack [instant answer idea](https://duck.co/ideas)?**

Yes, it is. 

**Which existing instant answers will this one supersede/overlap with?**

Some queries for Pokémon by name turn up Wikipedia instant answers.

**Are you having any problems? Do you need our help with anything?**

The developer has currently halted development on the API, and it is unknown when work will resume on it. 
As a result, the PokeAPI suffers from some disorganization and lots of incomplete or dated entries.
This can be observed through the sprites for each Pokémon, which are pulled from multiple generations with disparite artstyles.

On another note, I am vastly underexperienced as a developer and I am generally learning things as I go.
I have nearly zero experience working with Perl, and know little about proper CSS.

**\*\*Note:** Please attach a screenshot for new instant answer pull requests, and for pull requests which modify the look/design of existing instant answers.

http://en.zimagez.com/full/f2fe8c5f29dd73ce817defaa1cf6b754a3c50548d934cfd66924c0fb25bf0a9ddaca89219ae8eaf581b32154b86f618dc1770ae6dd8fa56f.php


##Checklist
Please place an 'X' where appropriate.

```
[] Added metadata and attribution information
[] Wrote test file and added to t/ directory
[] Verified that instant answer adheres to design guidelines(https://github.com/duckduckgo/duckduckgo-documentation/blob/master/duckduckhack/styleguides/design_styleguide.md)
[] Tested cross-browser compatability

    Please let us know which browsers/devices you've tested on:
    - Windows 8
        [] Google Chrome   
        [] Firefox         
        [] Opera           
        [] IE 10           

    - Windows 7
        [] Google Chrome   
        [] Firefox         
        [] Opera           
        [] IE 8            
        [] IE 9            
        [] IE 10           

    - Windows XP
        [] IE 7            
        [] IE 8            

    - Mac OSX
        [] Google Chrome   
        [] Firefox         
        [] Opera           
        [] Safari          

    - iOS (iPhone)
        [] Safari Mobile   
        [] Google Chrome   
        [] Opera           

    - iOS (iPad)
        [] Safari Mobile   
        [] Google Chrome   
        [] Opera            

    - Android
        [] Firefox         
        [] Native Browser  
        [] Google Chrome   
        [] Opera
```
