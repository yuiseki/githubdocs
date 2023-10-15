
# Osmium Command Line Tool

A multipurpose command line tool for working with OpenStreetMap data based on
the Osmium library.

Official web site: https://osmcode.org/osmium-tool/

[![Github Build Status](https://github.com/osmcode/osmium-tool/workflows/CI/badge.svg?branch=master)](https://github.com/osmcode/osmium-tool/actions)
[![Appveyor Build status](https://ci.appveyor.com/api/projects/status/k9v6et0o4baekrmi/branch/master?svg=true)](https://ci.appveyor.com/project/lonvia/osmium-tool/branch/master)


## Prerequisites

You need a C++14 compliant compiler.

You also need the following libraries:

    Libosmium (>= 2.16.0)
        https://osmcode.org/libosmium
        Debian/Ubuntu: libosmium2-dev
        Fedora/CentOS: libosmium-devel

    Protozero (>= 1.6.3)
        https://github.com/mapbox/protozero
        Debian/Ubuntu: libprotozero-dev
        Fedora/CentOS: protozero-devel

    RapidJSON (>= 1.1)
        This is included in the osmium-tool repository, so you usually do
        not need to install this.
        http://rapidjson.org/
        Debian/Ubuntu: rapidjson-dev

    boost-program-options (>= 1.55)
        https://www.boost.org/doc/libs/1_55_0/doc/html/program_options.html
        Debian/Ubuntu: libboost-program-options-dev
        Fedora/CentOS: boost-devel
        openSUSE: boost-devel (use 'libboost_program_options-devel' for modern OS versions)

    bz2lib
        http://www.bzip.org/
        Debian/Ubuntu: libbz2-dev
        Fedora/CentOS: bzip2-devel
        openSUSE: libbz2-devel

    zlib
        https://www.zlib.net/
        Debian/Ubuntu: zlib1g-dev
        Fedora/CentOS: zlib-devel
        openSUSE: zlib-devel

    LZ4 (optional)
        https://lz4.github.io/lz4/
        Debian/Ubuntu: liblz4-dev

        Only needed for LZ4 PBF compression.

    Expat
        https://libexpat.github.io/
        Debian/Ubuntu: libexpat1-dev
        Fedora/CentOS: expat-devel
        openSUSE: libexpat-devel

    cmake
        https://cmake.org/
        Debian/Ubuntu: cmake
        Fedora/CentOS: cmake
        openSUSE: cmake

    Pandoc
        (Needed to build documentation, optional)
        https://pandoc.org/
        Debian/Ubuntu: pandoc
        Fedora/CentOS: pandoc
        openSUSE: pandoc

On Linux systems most of these libraries are available through your package
manager, see the list above for the names of the packages. But make sure to
check the versions. If the packaged version available is not new enough, you'll
have to install from source. Most likely this is the case for Protozero and
Libosmium.

On macOS many of the libraries above will be available through Homebrew.

When building the tool, CMake will automatically look for these libraries in
the usual places on your system. In addition it will look for the Libosmium and
Protozero libraries in the same directory where this Osmium repository is. So
if you are building from the Git repository and want to use the newest
Libosmium, Protozero, and Osmium, clone all of them into the same directory:

    mkdir work
    cd work
    git clone https://github.com/mapbox/protozero
    git clone https://github.com/osmcode/libosmium
    git clone https://github.com/osmcode/osmium-tool


## Building

Osmium uses CMake for its builds. On Linux and macOS you can build as follows:

    cd osmium-tool
    mkdir build
    cd build
    cmake ..
    ccmake .  ## optional: change CMake settings if needed
    make

To set the build type call cmake with `-DCMAKE_BUILD_TYPE=type`. Possible
values are empty, Debug, Release, RelWithDebInfo, MinSizeRel, and Dev. The
default is RelWithDebInfo.

Please read the CMake documentation and get familiar with the `cmake` and
`ccmake` tools which have many more options.

On Windows you can compile with the Visual Studio C++ compiler and nmake.
The necessary dependencies can be installed with [conda](https://conda.io).
See `appveyor.yml` for the necessary commands to compile osmium-tool.


## Documentation

See the [Osmium Tool website](https://osmcode.org/osmium-tool/)
and [Osmium Tool Manual](https://osmcode.org/osmium-tool/manual.html).

There are man pages in the 'man' directory. To build them you need 'pandoc'.
If the `pandoc` command was found during the CMake config step, the manpages
will be built automatically.


## Tests

Call `ctest` in the build directory to run the tests after build.

More extensive tests of the libosmium I/O system can also be run. See
`test/io/Makefile.in` for instructions.


## License

Copyright (C) 2013-2023  Jochen Topf (jochen@topf.org)

This program is available under the GNU GENERAL PUBLIC LICENSE Version 3.
See the file LICENSE.txt for the complete text of the license.


## Authors

This program was written and is maintained by Jochen Topf (jochen@topf.org).

