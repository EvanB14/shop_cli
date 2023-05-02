#include <stdlib.h>
#include <iostream>

#include "mysql_driver.h"
#include "mysql_connection.h"

#include <cppconn/driver.h>
#include <cppconn/exception.h>
#include <cppconn/resultset.h>
#include <cppconn/statement.h>

using namespace std;

int main(void) {

    try {
        
        sql::Driver *driver;
        sql::Connection *con;
        sql::Statement *stmt;
        sql::ResultSet *res;

        driver = sql::mysql::get_driver_instance();
        con = driver->connect("tcp://127.0.0.1:3306", "admin", "root");

        con->setSchema("shopping_cli");

        stmt = con->createStatement();

        res = stmt->executeQuery("SELECT * from products");

        while (res->next()) cout << res->getString(1) << " " << res->getString(2) << " " << res->getString(3) << " " << res->getString(4) << endl;

        delete res;
        delete stmt;
        delete con;

        } catch (sql::SQLException &e) {

        cout << "# ERR: SQLException in " << __FILE__;
        cout << "(" << __FUNCTION__ << ") on line " << __LINE__ << endl;
        cout << "# ERR: " << e.what();
        cout << " (MySQL error code: " << e.getErrorCode();
        cout << ", SQLState: " << e.getSQLState() << " )" << endl;

    }

    cout << endl;

    return EXIT_SUCCESS;
}