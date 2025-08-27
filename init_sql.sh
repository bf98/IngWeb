#!/bin/bash

case "$1" in
    up)
	sudo /opt/lampp/xampp startmysql
	sudo /opt/lampp/xampp startapache
	;;
    down)
	sudo /opt/lampp/xampp stopmysql
	sudo /opt/lampp/xampp stopapache
	;;
    *)
	echo "Invalid option"
	exit 1
	;;
esac
