

## Juan Neri

##### https://github.com/lmu-cmsi370-fall2017/reusable-component-juanjoneri.git

| | Feedback | Points | Notes |
| --- | --- | ---: | --- |
| **Direct manipulation implementation (_2b_, _3a_, _3b_, _4a_, _4b_, _4d_)** | The knob generally works, with one behavior that might confuse users: on `mousedown`, the knob jumps to the value indicated by the mouse location. This might be by design, but note how it “breaks” the illusion of a real-world knob somewhat. The alternative behavior would be to set the value of the knob in a manner _relative_ to the mouse’s movement, such that taking the mouse to the same location to initiate a knob turn doesn’t skip the knob back there over and over, but allows the knob to be turned little by little. | 19 | Potential user confusion from “jump on `mousedown`” behavior of this knob implementation |
| **Notification mechanism (callback/event) (_2b_, _3b_, _4a_, _4b_, _4d_)** | Notifier includes `$current` as `this`, then `currentAngle` and `newAngle`. | 20 |  |
| **Plugin model implementation (_2b_, _3b_, _4a_, _4b_, _4d_)** | `data(‘knob-angle’)` works well for the model. | 20 |  |
| **Web front end integration (_2b_, _3a_, _3b_, _4a_, _4b_, _4d_)** | Nicely integrated—works particularly well, especially the skeuomorphic knob version. The second knob also shows the self-contained nature of the component, which is another good thing to coordinate.<br><br>However the integrated component code shows some differences from the component code in the reusable-component repository. I know this is generally just refactoring, but still it detracts a bit from the “reusable” idea.<br><br>What the two knobs do, though, is show the need for additional synchronization between their two models. Since they both control the map zoom, it stands to reason that the knob positions should stay in sync as they move. That’s beyond the scope of this assignment, but pointing out this behavior helps one appreciate the work that gets put into more comprehensive component systems like React. | 18 | Integrated and master component code are not identical |
| **Inappropriate third-party library use** | No third-party contraband found. |  |  |
| **Test Suite (_4a_, _4b_, _4d_)** | 6 out of 6<br><br>**Statements** 33/33 (100.00%)<br>**Branches** 10/10 (100.00%)<br>**Functions** 3/3 (100.00%)<br>**Lines** 33/33 (100.00%) | 20 | 
| **Code Style (_4c_)** | No errors. |  |  |
| **Version Control (_4e_)** | 16 commits |  |  |
| **Punctuality (_4f_)** | on time |  |  |
|  |  | **97** | **Total** |
