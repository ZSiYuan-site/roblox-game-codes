# Fisch Ashen Fortune vs Hades Curse: What x5 and x11.1 Mean in C$

Two Fisch mutations show up in sell-price questions more than most: Ashen Fortune and Hades' Curse. One is a mid-table x5, the other is the second-best standard mutation in the wiki data. Here is what the gap means in coins, using the numbers on the mutation pages.

## The two multipliers

On the [Ashen Fortune mutation](https://newgamescout.com/fisch/mutations/ashen-fortune) page the multiplier is x5, a standard mutation, ranked #64 of 146 in the standard group. The Appraiser cannot roll it. On the [Hades' Curse mutation](https://newgamescout.com/fisch/mutations/hades-curse) page the multiplier is x11.1, also standard, ranked #2 of 146, also not appraisable. So Hades' Curse is worth 2.22 times as much as Ashen Fortune on the same fish, every time.

## Same fish, two prices

Both pages price each fish at its average weight, using the wiki's average sell price. The best fish for both is the Magician Narwhal at 12,700 kg average.

| Fish | Ashen Fortune (x5) | Hades' Curse (x11.1) |
|---|---|---|
| Magician Narwhal | 3,175,000 | 7,048,500 |
| Bloop Fish | 2,666,400 | 5,919,408 |
| Corrupted Megalodon | 1,375,000 | 3,052,500 |
| Elder Mossjaw | 1,145,000 | 2,541,900 |
| Ashclaw | 1,120,000 | 2,486,400 |

All values are in C$. The page headlines are even higher for the Poltergeist, a Special fish, at 9.25M with Ashen Fortune and 20.5M with Hades' Curse.

## Adding Shiny on top

Shiny and Sparkling multiply on top by x1.85. A Magician Narwhal with Ashen Fortune and Shiny comes to 5,873,750 C$, and with Hades' Curse and Shiny it is 13,039,725 C$. The gap between the two mutations stays about the same, only bigger.

## How to check your own catch

The formula is ceil( ceil(C$ per kg x weight) x mutation x attributes ). The game rounds up twice, so a plain calculator is often a coin or two off. Instead of doing it by hand, put the fish into the [Fisch sell price calculator](https://newgamescout.com/fisch/calculator) and add the mutation; there is also a page that shows how a [sell price changes by weight](https://newgamescout.com/fisch/sell-price) for one fish across different mutations.

## Common mistakes

1. Comparing a Hades' Curse fish to an Ashen Fortune fish without looking at weight. Weight is a plain multiplier, so a heavy fish with the lower mutation can still win.
2. Assuming the Appraiser can give you either one. It cannot; both pages say Appraisable: No.
3. Trusting a number for a fish the wiki disagrees with itself on. The pages leave those fish out of the top 10 list for exactly that reason.

## Which to chase

If you are choosing between two catches that are otherwise identical, take the Hades' Curse one. If the Ashen Fortune fish is twice as heavy, check the numbers, because that is roughly the break-even point.

For more on how I read these tables, see the earlier notes in this repository, for example the [store packs explained for +1 Ghoul Evolution](https://zsiyuan-site.github.io/roblox-game-codes/ghoul-evolution-store-packs-explained-1118/) and the [30 Floors Up bolt cutters note](https://zsiyuan-site.github.io/roblox-game-codes/30fu-bolt-cutters-where-seen-1118/).
