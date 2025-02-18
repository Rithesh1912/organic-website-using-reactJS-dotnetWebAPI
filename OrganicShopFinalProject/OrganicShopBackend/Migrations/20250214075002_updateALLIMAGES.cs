using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OrganicShopBackend.Migrations
{
    /// <inheritdoc />
    public partial class updateALLIMAGES : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$iTkfwZV79Q0XAvg/1gXyru5.PQBZwyxsCdf4B3fc3wBgVtRNLEBAe");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 2,
                column: "PasswordHash",
                value: "$2a$11$rqKXrt0bJky4lmVjV6f2lenfrIDF9H0cCBYpG8IyWFnOSAP1FNOuS");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$XjfGUaeIu.udshg8gpc/teGGci1JP9cuYTkqKQF48NZfvGbYs8wpm");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 2,
                column: "PasswordHash",
                value: "$2a$11$DwwJYywXEdN8.QT2WBrv8OH4clJLlZXPEYUlTwUan3YutA6ocfE6y");
        }
    }
}
