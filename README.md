# AES Funtastic!

<img src="https://cloud.githubusercontent.com/assets/4176562/11134584/8e4ce372-8963-11e5-89eb-a32cf26d0710.png" width="90%"></img>

The [Advanced Encryption Standard (AES)](http://csrc.nist.gov/publications/fips/fips197/fips-197.pdf) is one of the most popular block encryption algorithms used throughout the world today. Also known as Rijndael, AES was developed by Joan Daemen and Vincent Rijmen.

I created the AES Funtastic application as a project for a graduate studies course in Computer Security (SEIS 720), taught by Dr. Brad Rubin at the [University of St. Thomas](http://www.stthomas.edu/).

The purpose of this project was to enhance my understanding of the AES algorithm and to provide a platform that other students could use to exercise the algorithm. The algorithm design was heavily influenced by the paper, [Advanced Encryption Standard by Example](http://www.adamberent.com/documents/AESbyExample.htm), written by Adam Berent.

## Application design

The application does not represent a reference implementation. While I attempted to follow best practices in code design, I valued readability over brevity and performance. The code implementation makes use of several algorithmic shortcuts by leveraging pre-calculated tables instead of performing raw computations. This design decision may be advantageous in cases where memory is not a constraint.

I implemented proper unit testing wherever possible to validate the AES algorithm functions. It's important to note that the testing isn't exhaustive, and the algorithm could potentially contain some defects. Do not use this algorithm implementation in production without further testing.

## Installation

The application may be installed on any environment supported by Node.js. Both node and the node package manager (npm) must be installed before building this application.

The installation process has 4 steps:

  1. Install node on your system (if not already installed)
  2. Clone the project repository to your system
  3. Install project node packages
  4. Install project web application libraries

The easiest way to install node on your platform is via one of the packages at: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)

If you are on a Mac and use homebrew, you can install node by typing `brew install node`.

Once node is installed on your machine, clone the application by typing `git clone https://github.com/jasondbaker/aesproject.git` in an appropriate directory location (i.e., ~/software/).

Go to the root of the newly cloned directory (`cd aesproject`) and install the required packages by typing `npm install`. It may take a few minutes to download and install the packages. Note, some warning messages may appear during the package installation.

Finally, install the web application javascript libraries using the Bower package manager by typing `bower install`.

## Running

Run `grunt serve` in the application root directory to build the
application and launch a server on port 9000. A web browser session should automatically open pointing to the web root directory at this port address. Javascript must be enabled in the web browser to run this application properly.

Kill the running grunt process (typically ctrl-c in the terminal) to quit the application.

## Testing

Executing `grunt test` in the application root directory will run the unit tests with karma.

## Licensing

This software is licensed under the [MIT License](https://opensource.org/licenses/MIT), and Copyright © 2015 Jason Baker.
